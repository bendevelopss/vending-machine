import React from "react";
import ProdButton from "./ProdButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

class ProdButtonGroup extends React.Component {
    constructor(){
        super();
        this.state = {
            code: "00",
            buttons: ["A","1","4","B","2","5","C","3","6"]
        };
    }

    codeSelect(code){
        const {showAlertMessage} = this.props;
        code = this.state.code[1] + code;

        if(code.includes("0")){
            this.setState({code: code});
        } else {
            let objects = this.props.objects;

            let chosen = objects.find(prod => prod.code == code);
            
            if(chosen != null){
                this.props.onChoose(chosen);
                this.setState({code: code});

                setTimeout(() => {
                    this.clearCode();
                },1000);
            } else {
                this.stars();
                showAlertMessage("error", "Invalid input code");
                setTimeout(() => {
                    this.clearCode();
                },1000);
            }
        }  


    }

    stars(){
        this.setState({code: "**"});
    }

    clearCode(){
        this.setState({code: "00"});
    }

    render() {
        const Div = styled("div")(({ theme }) => ({
            theme,
            backgroundColor: "lightgray",
            padding: theme.spacing(0.5),
        }));


        const objects = this.state.buttons.map(object => {
            return (
                <ProdButton
                    class="col-4"
                    name={object}
                    obj={object}
                    onChoose={(code)=>this.codeSelect(code)}
                />
            );
        });

        return (    
            <div class="col-12">
                <div class="product-selection">
                    <div class="row no-pad">
                        {objects}
                    </div>

                    { 
                        <Stack sx={{ width: "100%", p: 1}} spacing={2}>
                            <Div color="primary">{this.state.code }</Div>
                        </Stack>
                    }
                </div>
            </div>
        );
    }
}

export default ProdButtonGroup;
