

export function StatePromise(_this, state) {
    return new Promise((resolve) => {
        _this.setState(state, resolve)
    });
}