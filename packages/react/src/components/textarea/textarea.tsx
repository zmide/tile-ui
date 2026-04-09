import React, { useId } from 'react';
import { getTextareaIds, getTextareaAriaProps } from '@tile-ui/core';
import type { TextareaBaseProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/textarea.module.scss';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaBaseProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', label, error, helperText, required, id: providedId, ...props }, ref) => {
	const generatedId = useId();
	const id = providedId || generatedId;
	const ids = getTextareaIds(id);
	const ariaProps = getTextareaAriaProps(ids, error, helperText);

	return (
		<div className={styles.textareaWrapper}>
			{label && (
				<label htmlFor={id} className={`${styles.label} ${required ? styles.required : ''}`}>
					{label}
				</label>
			)}
			<textarea ref={ref} id={id} className={`${styles.textarea} ${error ? styles.error : ''} ${className}`} {...ariaProps} {...props} />
			{error && (
				<span id={ids.error} className={styles.errorText}>
					{error}
				</span>
			)}
			{!error && helperText && (
				<span id={ids.helper} className={styles.helperText}>
					{helperText}
				</span>
			)}
		</div>
	);
});

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
