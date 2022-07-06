export const showAlertMessage = (type, message) => {
    return {
        type: "SHOW_ALERT_MESSAGE",
        payload: {
            open: true,
            severity: type,
            message,
        }
    };
};

export const closeAlertMessage = () => {
    return {
        type: "CLOSE_ALERT_MESSAGE",
        payload: { open: false }
    };
};