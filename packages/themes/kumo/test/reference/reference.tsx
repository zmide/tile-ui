import { Button } from '@reference/button';
import { Input } from '@reference/input';
import { Checkbox } from '@reference/checkbox';
import { Switch } from '@reference/switch';
import { Tabs } from '@reference/tabs';
import { Tooltip, TooltipProvider } from '@reference/tooltip';
import '@reference-css';

const sizeOf = (size: string) => (size === 'default' ? 'base' : size);

export function renderCase(spec) {
	if (spec.component === 'button') {
		return (
			<Button variant={spec.variant === 'default' ? 'primary' : 'secondary'} size={sizeOf(spec.size)} disabled={spec.state === 'disabled'}>
				Save changes
			</Button>
		);
	}
	if (spec.component === 'input') {
		return (
			<div className="input-consumer">
				<Input
					size={sizeOf(spec.size)}
					aria-label="Project name"
					defaultValue={spec.state === 'placeholder' ? '' : 'Project name'}
					placeholder="Project name"
					disabled={spec.state === 'disabled'}
				/>
			</div>
		);
	}
	if (spec.component === 'checkbox') {
		return <Checkbox aria-label="Select item" checked={spec.state === 'checked'} indeterminate={spec.state === 'mixed'} />;
	}
	if (spec.component === 'switch') {
		return <Switch aria-label="Enable setting" size={sizeOf(spec.size)} checked={spec.state === 'checked'} />;
	}
	if (spec.component === 'tabs') {
		return (
			<Tabs
				variant={spec.variant === 'line' ? 'underline' : 'segmented'}
				tabs={[
					{ value: 'overview', label: 'Overview' },
					{ value: 'settings', label: 'Settings' },
				]}
				selectedValue="overview"
			/>
		);
	}
	return (
		<TooltipProvider>
			<Tooltip open content="Helpful details" side="bottom" delay={0} render={<Button variant="secondary" />}>
				Details
			</Tooltip>
		</TooltipProvider>
	);
}
