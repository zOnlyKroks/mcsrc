import { useEffect, useState } from "react";
import type { Observable } from "rxjs";

export function useObservable<T>(observable: Observable<T>) {
    const [state, setState] = useState<T>();

    useEffect(() => {
        const sub = observable.subscribe(setState);

        return () => sub.unsubscribe();
    }, [observable]);

    return state;
}
