interface State {
    id: number;
    content: string;
}

type Action = { type: 'listItems/GET', listItems: [] };

const initState = [];

export const reducer = (state: State[] = initState, action: Action): State[] => {
    switch (action.type) {
        case 'listItems/GET':
            return [
                ...action.listItems,
                ...state,
            ];

        default:
            return state;
    }
}
