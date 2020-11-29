import { useEffect } from 'react';

export default function useMountCallback(cb) {
    useEffect(() => {
        cb && cb();
    }, [cb]);
}
