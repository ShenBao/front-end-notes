import EventEmitter from "eventemitter3";
import install from "../../../src/index";
import { EventType, TypeListenerOptions } from '../../../src/types';

const evm = install({
    evmOptions: {
        eTarget: {
            isInWhiteList(target: any, event: EventType, listener: Function,
                options: TypeListenerOptions) {
                return target.id === "btn1"
            }
        },
        events: {
            et: EventEmitter
        }
    }
});

evm.start();

document.getElementById('btnStatistic')?.addEventListener("click", function () {
    console.log('evm:', evm);
    // evm.eTarget.statistics().then(res=> console.log(res));

    evm.evm.eTarget.statistics()
        .then(res => console.log('统计信息-Node节点:', res));

    evm.evm.events.statistics()
        .then(res => console.log('统计信息-EventEmitter:', res));

})