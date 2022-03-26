import { CreateOptions, EnumEVMType } from "./types";
import { isObject } from "./util";

import Base from "./BaseEvm";
import ETarget from "./evm/ETarget";
import Events from "./evm/Events";
import CEvents from "./evm/CEvents";

import UIRender from "./ui/UIRender";

export const ETargetEVM = ETarget;
export const EventsEVM = Events;
export const CEventsEVM = CEvents
export const BaseEvm = Base;

export interface IUIRender {
    new (evm: Record<EnumEVMType, Base>): any;
}


export function createAllEVM(options: CreateOptions = {}): Record<EnumEVMType, Base> {
    const obj = Object.create(null);
    if (isObject(options.cEvents)) {
        obj["cEvents"] = new CEventsEVM(options.cEvents, options.cEvents?.et)
    }
    if (isObject(options.eTarget)) {
        obj["eTarget"] = new ETargetEVM(options.eTarget, options.eTarget?.et)
    }
    if (isObject(options.events)) {
        obj["events"] = new EventsEVM(options.events, options.events?.et)
    }
    return obj;
}

interface InstallOptions {
    evmOptions?: CreateOptions,
    render?: IUIRender
}

export default function install(options: InstallOptions = {}) {
    const evm = createAllEVM(options.evmOptions);

    function start(){
        console.log("evm started");
        evm?.cEvents?.watch();
        evm?.eTarget?.watch();
        evm?.events?.watch();
    }

    if (options.render) {
        return {
            render: new options.render(evm),
            evm,
            start
        }
    }
    return {
        render: new UIRender(evm),
        evm,
        start
    }
}