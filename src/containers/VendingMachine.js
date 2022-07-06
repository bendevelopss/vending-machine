import React from "react";
import ProdButtonGroup from "../components/ProdButtonGroup";
import CoinButtonGroup from "../components/CoinButtonGroup";
import ObjReturn from "../components/ObjReturn";
import ProductWindow from "../components/ProductWindow";
import utils from "../scripts/utilities";
import stock from "../scripts/stock";
import store from "../redux/store";
import { connect } from "react-redux";
import { closeAlertMessage, showAlertMessage } from "../redux/actions/actions";
import AlertComponent from "../components/AlertComponent";
import Button from "@mui/material/Button";


const weightHash = {
    928: 1.00,
    952: 2.00,
    836: 0.10,
    1192: 0.20,
    1055: 0.50,
};

let inventory = utils.copy(stock.inventory);
let totalCoins = utils.copy(stock.totalCoins);

class VendingMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: "https://dallasnews.imgix.net/1467383389-liberty.png?w=724&h=500&auto=format&q=60&fit=clip",
            totalCoins: totalCoins,
            insertedCoins: [],
            currentAmount: 0,
            coinReturn: [],
            productReturn: [],
            inventory: inventory,
            display: "Deposit Money",
            priceDisplay: "",
            selections: stock.selections,
            coins: stock.coins
        };
    }

    display() {
        let coins = this.state.totalCoins;
        return this.sumCoins(coins) > 100 ? "Insert Coin" : "Exact Change";
    }

    formatMoney(coins) {
        let money = "" + this.sumCoins(coins);
        return this.addDollarSign(money);
    }

    addDollarSign(money) {
        return "$" +  (Math.round(money*100)/100).toFixed(2);
    }

    sumCoins(coins) {
        return coins.reduce((acc, coin) => acc + coin.value, 0);
    }
    // reconsider the display...
    chooseProduct(product) {
        this.setState({priceDisplay: ""});
        let inv = this.state.inventory,
            prodIdx = this.findProdIdx(product),
            insertedCoins = this.state.insertedCoins,
            pdProd, 
            changeVal, 
            change, 
            totalCoins;

        if ( prodIdx == -1 )
            return store.dispatch(showAlertMessage("error", "SOLD OUT"));

        if ( this.sumCoins(insertedCoins) < product.price ){
            store.dispatch(showAlertMessage("error", "INSUFFICIENT BALANCE"));
            return this.setState({priceDisplay: "Product Price: $" + (Math.round(product.price*100)/100).toFixed(2)});
        }

        if ( this.sumCoins(insertedCoins) >= product.price ) {
            pdProd = inv.splice(prodIdx, 1); 
            changeVal = this.sumCoins(insertedCoins) - product.price;
            totalCoins = this.state.totalCoins;
            change = this.makeChange(changeVal, totalCoins);
            totalCoins = change[1];
            change = change[0];

            return this.setState({
                priceDisplay: "",
                insertedCoins: [],
                coinReturn: this.state.coinReturn.concat(change),
                productReturn: this.state.productReturn.concat(pdProd),
                inventory: inv,
                totalCoins: totalCoins.concat(insertedCoins)
            });

        }
    }

    resetDisplay() {
        this.setState({display: "Deposit Money"});
    }

    resetDisplayTimeout() {
        setTimeout(() => this.resetDisplay(), 1000);
    }

    makeChange(change, totalCoins) {
        let coinVals = [1.00,2.00,0.10,0.20,0.50],
            rtndCoins = [],
            cnIdx;

        coinVals.forEach(val => {
            let times = Math.floor(change / val);
            if ( times == 0 )
                return;

            for (var i = 0; i < times; i++) {
                cnIdx = totalCoins.findIndex(coin => coin.value == val);
                if ( cnIdx == -1 )
                    return; 

                rtndCoins.push(totalCoins.splice(cnIdx, 1)[0]);
                change = change - val;
            }
        });
        return [rtndCoins, totalCoins];
    }

    productInStock(product) {
        let inStock = this.findProdIdx(product) >= 0 ? true : false;

        if ( inStock )
            return true;
        else if ( !inStock )
            return false;
    }

    deliverProduct(i) {
        let inv = this.state.inventory;
        let pdProd = inv.splice(i, 1);
        this.setState({
            inventory: inv, 
            productReturn: this.state.productReturn.concat([pdProd])
        });
    }

    findProdIdx(product) {
        let inventory = this.state.inventory;
        let idx = inventory.findIndex(prod => prod.name == product.name);
        return idx;
    }

    insertCoin(coin) {
        coin = this.identifyValue(coin);
        this.depositCoin(coin);
    }

    identifyValue(coin) {
        coin.value = weightHash[coin.weight];
        return coin;
    }

    updateCurrentAmount() {
        let coins = this.state.insertedCoins;
        this.setState({
            currentAmount: this.sumCoins(coins)
        });
    }


    depositCoin(coin) {
        this.setState({
            insertedCoins: this.state.insertedCoins.concat([coin])
        });
    }

    loadCoins() {
        this.setState({
            totalCoins: this.state.totalCoins.concat(stock.totalCoins)
        });
    }

    restockProducts() {
        this.setState({
            display: this.display(),
            inventory: this.state.inventory.concat(stock.inventory)
        });
    }

    displayCoinReturn() {
        return this.state.coinReturn.map(coin => coin.name).join(", ");
    }

    displayProductReturn() {
        return this.state.productReturn.map(prod => <img class="prod-img-2" src={prod.img}/> );
    }

    takeCoins() { 
        this.setState({priceDisplay: ""});
        if(this.state.coinReturn.length > 0) store.dispatch(showAlertMessage("success", "CHANGE RECEIVED"));
        this.setState({
            coinReturn: []
        });
    }

    takeProduct() {
        this.setState({
            productReturn: []
        });
    }

    returnCoin() {
        let coins = this.state.insertedCoins;
        if (coins.length > 0) store.dispatch(showAlertMessage("success", "MONEY RETURNED"));
        this.setState({
            insertedCoins: [],
            coinReturn: this.state.coinReturn.concat(coins)
        });
    }

    render(){
        const {open, closeAlertMessage, showAlertMessage ,message, severity} = this.props;
        return (
            <div class="row">
                <AlertComponent open={open} handleClose={closeAlertMessage} message={message} severity={severity} />
                <div class="col-lg-10 col-md-11 col-sm-12" id="vending-machine">
                    <div class="row">
                        <div class="col-lg-8 col-md-7 col-sm-7 prod-col">
                            <div class="products">
                                <ProductWindow
                                    class="product-window row no-pad" 
                                    products={this.state.inventory}
                                    text="window"
                                    selections={this.state.selections}
                                />
                            </div>
                            <ObjReturn
                                class="product-return"
                                innerClass="product-return-btn"
                                name="Product" 
                                display={this.displayProductReturn()}
                                showAlertMessage={showAlertMessage}
                                onTake={() => this.takeProduct()}
                            />
                        </div>
                        <div class="col-lg-4 col-md-5 col-sm-5 int-col">
                            <div class="interface">
                                <div class="row no-pad">
                                    <div class="col-12">
                                        <div class="display">
                                            <div class ="row no-pad">
                                                <div class="col-6">
                                                    
                                                    <div class="message">{this.state.display}</div>
                                                    <div class="amount">{this.formatMoney(this.state.insertedCoins)}</div>
                                                    <div class="message" style={{paddingTop: 15, color: "red"}}>{open ? this.state.priceDisplay : null}</div>

                                                    
                                                </div>
                                                <CoinButtonGroup
                                                    class="insert-coin col-6"
                                                    name="Coins"
                                                    question=""
                                                    objects={this.state.coins}
                                                    onChoose={(coin) => this.insertCoin(coin)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row no-pad">
                                    <ProdButtonGroup
                                        showAlertMessage={showAlertMessage}
                                        name="Product"
                                        question="Choose a Product:"
                                        objects={this.state.selections}
                                        onChoose={(product) => {
                                            this.chooseProduct(product);
                                            // this.resetDisplayTimeout();
                                        }}
                                    />
                                </div>
                                <div class="row no-pad">
                                    <div class="col-12">
                                        <div class="admin">
                                            <span>Change: {this.formatMoney(this.state.coinReturn)}</span>

                                            <div class="row">
                                                <div class="col-6">
                                                    <Button 
                                                        sx={{borderRadius: 16, m: 4, backgroundColor: "lightgray"}}
                                                        onClick={() => this.takeCoins()}
                                                        variant="outlined" 
                                                        size="large"
                                                    >
                                                        Get Change
                                                    </Button>
                                                </div>
                                                <div class="col-6">
                                                   
                                                    <Button 
                                                        sx={{borderRadius: 20, m: 4, backgroundColor: "lightgray"}}
                                                        onClick={() =>this.returnCoin()}
                                                        variant="outlined" 
                                                        size="large"
                                                    >
                                                        Return Money
                                                    </Button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.alert.open,
    message: state.alert.message,
    severity: state.alert.severity
});
  
const mapDispatchToProps = dispatch => ({
    showAlertMessage: (type, message) => dispatch(showAlertMessage(type, message)),
    closeAlertMessage: () => dispatch(closeAlertMessage()),

});

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);

