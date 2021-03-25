module.exports = class Event {

    constructor(client, name, options = {}) {
        this.name = options.name;
        this.client = client;
        this.type = options.once ? "once" : "on";
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
    }
    // eslint-disable-next-line no-unused-vars
    run(...args) {
        throw new Error(`Event ${this.name} doesn't provide a run method!`);
    }

};