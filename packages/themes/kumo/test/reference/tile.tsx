import { Button } from '@tile/button';
import { Input } from '@tile/input';
import { Checkbox } from '@tile/checkbox';
import { Switch } from '@tile/switch';
import { Tabs, TabsList, TabsTrigger } from '@tile/tabs';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@tile/tooltip';
import '@tile-ui/theme-kumo/theme.scss';

export function renderCase(spec) {
	if (spec.component === 'button') {
		return (
			<Button variant={spec.variant} size={spec.size} disabled={spec.state === 'disabled'}>
				Save changes
			</Button>
		);
	}
	if (spec.component === 'input') {
		return (
			<div className="input-consumer">
				<Input
					controlSize={spec.size === 'default' ? undefined : spec.size}
					aria-label="Project name"
					defaultValue={spec.state === 'placeholder' ? '' : 'Project name'}
					placeholder="Project name"
					disabled={spec.state === 'disabled'}
				/>
			</div>
		);
	}
	if (spec.component === 'checkbox') {
		return <Checkbox aria-label="Select item" checked={spec.state === 'mixed' ? 'indeterminate' : spec.state === 'checked'} />;
	}
	if (spec.component === 'switch') {
		return <Switch aria-label="Enable setting" size={spec.size} checked={spec.state === 'checked'} />;
	}
	if (spec.component === 'tabs') {
		return (
			<Tabs defaultValue="overview">
				<TabsList variant={spec.variant}>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>
			</Tabs>
		);
	}
	return (
		<TooltipProvider>
			<Tooltip open>
				<TooltipTrigger asChild>
					<Button variant="secondary">Details</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" sideOffset={10}>
					Helpful details
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
