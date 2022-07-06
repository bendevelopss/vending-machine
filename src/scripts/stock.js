import { Coin } from "./coin";
import { Product } from "./product";

import utils from "./utilities";

const weightHash = {
    928: 1.00,
    952: 2.00,
    836: 0.10,
    1192: 0.20,
    1055: 0.50,
};

let caramel  = new Product({name: "Caramel", price: 2.50, img: "../../assets/caramel.png"}),
    hazelnut = new Product({name: "Hazelnut", price: 3.10, img: "../../assets/hazelnut.png"}),
    organic = new Product({name: "Organic", price: 2.00, img: "../../assets/organice.png"});
    // cheetos = new Product({name: "Cheetos", price: 0.50, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/cheetos.png"}),
    // twizzlers = new Product({name: "Twizzlers", price: 0.75, img:"https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/twizzlers.png"}),
    // carrot = new Product({name: "Carrot", price: 0.15, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/carrot.png"}),
    // apple = new Product({name: "Apple", price: 0.25, img: "https://vending-machine-bjo.s3.us-east-2.amazonaws.com/products/apple.png"});

let tenCents  = new Coin({name: "tenCents"}), // size and weight set upon coin init
    twentyCents = new Coin({name: "twentyCents"}),
    fiftyCents = new Coin({name: "fiftyCents"}),
    oneDollar = new Coin({name: "oneDollar"}),
    twoDollar = new Coin({name: "twoDollar"});


let coins = [
    utils.copy(tenCents),
    utils.copy(tenCents),
    utils.copy(tenCents),
    utils.copy(twentyCents),
    utils.copy(twentyCents),
    utils.copy(twentyCents),
    utils.copy(fiftyCents),
    utils.copy(fiftyCents),
    utils.copy(fiftyCents),
    utils.copy(oneDollar),
    utils.copy(oneDollar),
    utils.copy(oneDollar),
    utils.copy(twoDollar),
    utils.copy(twoDollar),
    utils.copy(twoDollar)
];

coins = coins.map(coin => { // set value for pre loaded coins
    coin.value = weightHash[coin.weight];
    return coin;
});

let caramelaSel = utils.copy(caramel),
    hazelnutSel = utils.copy(hazelnut),
    organicSel = utils.copy(organic);
    // cheetosSel = utils.copy(cheetos),
    // twizzlersSel = utils.copy(twizzlers),
    // carrotSel = utils.copy(carrot),
    // appleSel = utils.copy(apple);

let tenCentsSel = utils.copy(tenCents),
    twentyCentsSel = utils.copy(twentyCents),
    fiftyCentsSel = utils.copy(fiftyCents),
    oneDollarSel = utils.copy(oneDollar),
    twoDollarSel = utils.copy(twoDollar);


const stock = {
    inventory: [
        utils.copy(caramelaSel),
        utils.copy(caramelaSel),
        utils.copy(hazelnutSel),
        utils.copy(hazelnutSel),
        utils.copy(organicSel),
        utils.copy(organicSel),
        // utils.copy(cheetos),
        // utils.copy(cheetos),
        // utils.copy(twizzlers),
        // utils.copy(twizzlers),
        // utils.copy(carrot),
        // utils.copy(carrot),
        // utils.copy(apple),
        // utils.copy(apple),
    ],
    selections: [ // merge more into these objects, A1, A2, as well as the class associated for the image
        utils.merge(caramelaSel,{cls: "caramel", code: "A1", type: "product", prcDisp: "$2.50"}),
        utils.merge(hazelnutSel,{cls: "hazelnut", code: "A2", type: "product", prcDisp: "$3.10"}),
        utils.merge(organicSel,{cls: "prganic raw", code: "A3", type: "product", prcDisp: "$2.00"}),
        // utils.merge(cheetosSel,{cls: "cheetos", code: "B1", type: "product", prcDisp: "$0.50"}),
        // utils.merge(twizzlersSel,{cls: "twizzlers", code: "B2", type: "product", prcDisp: "$0.75"}),
        // utils.merge(carrotSel,{cls: "carrot", code: "B3", type: "product", prcDisp: "$0.15"}),
        // utils.merge(appleSel,{cls: "apple", code: "C1", type: "product", prcDisp: "$0.25"}),
    ],
    coins: [
        utils.merge(oneDollarSel, {cls: "1dollar", code: "\u00241.00", type: "dollar"}),
        utils.merge(twoDollarSel, {cls: "2dollar", code: "\u00242.00", type: "dollar"}),
        utils.merge(tenCentsSel, {cls: "10cents", code: "10\u00A2", type: "coin"}),
        utils.merge(twentyCentsSel, {cls: "20cents", code: "20\u00A2", type: "coin"}),
        utils.merge(fiftyCentsSel, {cls: "50cents", code: "50\u00A2", type: "coin"}),
    ],
    totalCoins: coins
};

export default stock;
