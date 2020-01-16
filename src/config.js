export default {
    rootPath:
        process.env.REACT_APP_STATE === "localhost" ? "http://reader_habit.ngrok.io/v1/facebook/user/network" : ""
};
