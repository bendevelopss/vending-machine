import React from 'react';

class ObjReturn extends React.Component {
    deliverProduct() {
        this.props.onTake();
    }

    render() {
        const {showAlertMessage} = this.props;
        return (
            <div class={this.props.class}>
                <div class="row">
                    <div class="col-12">
                        <button 
                            class={this.props.innerClass}
                            type="button" 
                            onClick={() => {
                                this.deliverProduct();
                                if(this.props.display.length > 0) showAlertMessage("success", "ORDER RECEIVED");
                            }}
                        >{this.props.display}</button>
                    </div>
                </div>
            </div>
        )          
    }
}

export default ObjReturn;