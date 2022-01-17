import { DependencyList } from "react";
import { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export const useUpdateEffect = (effect: EffectCallback, dependencies: DependencyList = []) => {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			return effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};
