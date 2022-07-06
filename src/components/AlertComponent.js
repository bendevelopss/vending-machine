import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

class AlertComponent extends React.Component {
    
    render() {
        const {open, handleClose, severity, message} = this.props;

        return (
            <div>        
                { open &&  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Snackbar open={true} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>}
            </div>
        );
    }
}

export default AlertComponent;