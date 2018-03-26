'use strict'

import ClockrPlugin from './../../plugins/clock-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        this.clock = new ClockrPlugin(this).start();
        this.text = this.add.text(100, 100, '');

        this.input.on('pointerdown', this.clock.pause, this.clock);
        this.input.on('pointerup', this.clock.resume, this.clock);
    }

    update() {
        this.text.setText(this.clock.now * 0.001);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);