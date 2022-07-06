import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
class CoinButton extends React.Component {
    select(obj) {
        this.props.onChoose(obj);
    }
    
    render() {
        return (
            <Box sx={{ "& button": { m: 1.5 } }}>
                <div>
                    <Button 
                        sx={{borderRadius: 20, width: 75, height: 60, m: 4, backgroundColor: "lightgray"}}
                        onClick={() => this.select(this.props.obj)}
                        variant="outlined" 
                        size="large"
                    >{this.props.name}
                    </Button>
                </div>
            </Box>
        );
    }
}

export default CoinButton;