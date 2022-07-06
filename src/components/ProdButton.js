import React from "react";
import Button from "@mui/material/Button";

class ProdButton extends React.Component {
    select(obj) {
        this.props.onChoose(obj);
    }
    
    render() {
        return (
            <div className={this.props.class}> 
                <Button 
                    sx={{borderRadius: "100%", width: 75, height: 60, m: 1, backgroundColor: "lightgray"}}
                    onClick={() =>this.select(this.props.obj)}
                    variant="outlined" 
                    size="large"
                >{this.props.name}
                </Button>
            </div>
        );
    }
}

export default ProdButton;
