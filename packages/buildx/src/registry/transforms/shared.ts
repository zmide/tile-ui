import type { TransformFileInput, TransformFileOutput } from '../types';

export async function passthroughTransform(input: TransformFileInput): Promise<TransformFileOutput> {
	return {
		content: input.content,
		target: input.file.target,
	};
}
