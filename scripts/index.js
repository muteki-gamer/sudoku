HTMLDocument.prototype.createElementByCache = function (el, id) {
    const ele = document.querySelector(`#${id}`);
    if (ele) {
        return ele;
    } else {
        const ele = document.createElement(el);
        ele.id = id;
        return ele;
    }
}

class Component {

    constructor(state) {
        this.state = state;
        this.render();
        this.componentDidMount();
    }

    setState(obj) {
        if (this.shouldCompoentUpdate(obj)) {
            this.state = obj;
            this.render();
        }
    }

    componentDidMount() { }

    shouldCompoentUpdate(nextState) {
        return true;
    }

    render() { }

}

class Board extends Component {

    constructor() {
        super({
            nums: [],
            el: getRandomEleName(),
            areas: []
        });
    }

    componentDidMount() {
        const areas = [];
        for (let i = 0; i < 9; i++) {
            const eleName = getRandomEleName();
            areas.push(eleName);
        }

        this.setState({
            ...this.state,
            areas
        });
    }

    shouldCompoentUpdate(nextState) {
        return nextState.areas.length !== this.state.areas.length;
    }

    render() {
        // 初始化全局场景
        const board = document.createElementByCache('div', this.state.el);
        board.className = 'board';
        document.body.appendChild(board);

        this.state.areas.map(item => {
            const area = new Area(item);
            document.querySelector(`#${this.state.el}`).appendChild(area.ref);
        })
    }

}

class Area extends Component {

    constructor(el) {
        super({
            el,
            blocks: []
        });
    }

    componentDidMount() {
        const blocks = [];
        for (let i = 0; i < 9; i++) {
            const eleName = getRandomEleName();
            blocks.push(eleName);
        }

        this.setState({
            ...this.state,
            blocks
        });
    }

    shouldCompoentUpdate(nextState) {
        return nextState.blocks.length !== this.state.blocks.length;
    }

    render() {
        const area = document.createElementByCache('div', this.state.el);
        area.className = 'area';
        this.ref = area;

        this.state.blocks.map(item => {
            const block = new Block(item);
            this.ref.appendChild(block.ref);
        })
    }

}

class Block extends Component {

    constructor(el) {
        super({
            el,
            selected: false,
            btns: [],
            mounted: false
        })
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            mounted: true,
        });
    }

    shouldCompoentUpdate(nextState) {
        return nextState.selected !== this.state.selected ||
            nextState.mounted !== this.state.mounted;
    }

    render() {
        const block = document.createElementByCache('div', this.state.el);

        if (this.state.selected) {
            block.classList = 'block selected';
            block.innerHTML = this.state.selected;
        } else {
            if (this.state.mounted) {
                block.classList = 'block unselected';
                const btns = [];
                for (let i = 0; i <= 9; i++) {
                    const eleName = getRandomEleName();
                    const btn = new Button(eleName);
                    btn.innerTEXT = i;
                    btns.push(eleName);
                    block.appendChild(btn);
                }

                this.setState({
                    ...this.state,
                    btns,
                });
            }
        }

        this.ref = block;
    }

}

class Button extends Component {
    constructor(el) {
        super({
            el,
        });
    }

    render() {
        // const button = document.createElementByCache('button', this.state.el);
    }
}

const board = new Board();