import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class MeasurementTypeCreatedEvent extends DomainEvent {
    readonly measurementTypeId: string;
    readonly name: string;
    readonly unit: string;
    constructor(measurementTypeId: string, name: string, unit: string);
}
