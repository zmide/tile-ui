import { ref, watch, onMounted, type Ref } from 'vue';

/**
 * 使用本地存储的 composable
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
	const data = ref(defaultValue) as Ref<T>;

	function read() {
		if (typeof window === 'undefined') return;
		try {
			const item = window.localStorage.getItem(key);
			if (item !== null) {
				data.value = JSON.parse(item);
			}
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
		}
	}

	function write(value: T) {
		try {
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	}

	onMounted(() => {
		read();
	});

	watch(
		data,
		(newValue: T) => {
			write(newValue);
		},
		{ deep: true },
	);

	return data;
}

/**
 * 使用会话存储的 composable
 */
export function useSessionStorage<T>(key: string, defaultValue: T): Ref<T> {
	const data = ref(defaultValue) as Ref<T>;

	function read() {
		if (typeof window === 'undefined') return;
		try {
			const item = window.sessionStorage.getItem(key);
			if (item !== null) {
				data.value = JSON.parse(item);
			}
		} catch (error) {
			console.warn(`Error reading sessionStorage key "${key}":`, error);
		}
	}

	function write(value: T) {
		try {
			if (typeof window !== 'undefined') {
				window.sessionStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.warn(`Error setting sessionStorage key "${key}":`, error);
		}
	}

	onMounted(() => {
		read();
	});

	watch(
		data,
		(newValue: T) => {
			write(newValue);
		},
		{ deep: true },
	);

	return data;
}
