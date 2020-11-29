import { useCallback, useEffect, useRef } from 'react';

export default function useLogViewScroll(data) {
    const autoScrollRef = useRef(true);
    const lastScrollPositionRef = useRef();

    const scrollListener = useCallback(() => {
        if (lastScrollPositionRef.current > window.scrollY) {
            autoScrollRef.current = false;
        }
        if (window.scrollY + document.body.offsetHeight === document.body.scrollHeight) {
            autoScrollRef.current = true;
        }
        lastScrollPositionRef.current = window.scrollY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    });

    useEffect(() => {
        if (!autoScrollRef.current) return;
        window.scrollTo(0, document.body.scrollHeight);
    }, [data]);
}
