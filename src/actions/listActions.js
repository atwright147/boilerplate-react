import axios from 'axios';

export const updateListItems = () => {
    return function(dispatch) {
        axios
            .get('http://localhost:8882/api/lists/1')
            .then((res) => {
                dispatch({ type: 'listItems/GET', listItems: res.data });
            })
            .catch((err) => {
                console.error(err);  // eslint-disable-line no-console
            })
    }
}
