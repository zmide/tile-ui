import { useState, useCallback } from 'react';

/**
 * 存储键的类型
 */
type StorageKey = string;

/**
 * 使用本地存储的 hook
 * @param key - 存储键名
 * @param defaultValue - 默认值
 * @returns [值, 设置值的函数]
 */
export function useLocalStorage<T>(key: StorageKey, defaultValue: T | (() => T) = '' as T): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			if (item === null) {
				return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
			}
			return JSON.parse(item);
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				const valueToStore = value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== 'undefined') {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue],
	);

	return [storedValue, setValue];
}

/**
 * 使用会话存储的 hook
 */
export function useSessionStorage<T>(key: StorageKey, defaultValue: T | (() => T) = '' as T): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
		}

		try {
			const item = window.sessionStorage.getItem(key);
			if (item === null) {
				return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
			}
			return JSON.parse(item);
		} catch (error) {
			console.warn(`Error reading sessionStorage key "${key}":`, error);
			return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				const valueToStore = value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== 'undefined') {
					window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.warn(`Error setting sessionStorage key "${key}":`, error);
			}
		},
		[key, storedValue],
	);

	return [storedValue, setValue];
}
