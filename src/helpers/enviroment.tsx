let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    
    case 'ellieyan.herokuapp.com' :
        APIURL = 'https://ellieyan-server.herokuapp.com'
}

export default APIURL