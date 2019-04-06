import { removeInstance, saveInstance } from '../actions/modelActions';
import { store } from '../store';

export class BaseModel<P> {
    static resource: string;
    resource: string;
    static constraint;
    static defaultProps;

    constructor(public props: P & { id?: string }) {
        this.resource = this.constructor['resource'];
        this.props = props;
    }

    getStoreKey(): string { return `${this.resource}${this.props.id}`; }

    $save(): BaseModel<P> {
        saveInstance(this, this.getStoreKey(), this.resource);
        return this;
    }

    static list(state = store.getState()) {
        return state
            .models
            .filter(instance => instance.resource === this.resource)
            .toArray()
            .reverse();
    }

    static deleteAll(instances = this.list()) {
        instances.map(instance => {
            const modelInstance = instance[1];
            removeInstance(modelInstance.getStoreKey())
        });
    }

}
