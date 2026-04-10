import { defineComponent, ref } from 'vue';
import { TButton, TCard, TCardContent, TCardDescription, TCardFooter, TCardHeader, TCardTitle, TInput, TLabel, TTextarea } from '@tile-ui/vue';
import { DocPreview } from './doc-preview';
import { VueDocContentPreview } from './docs-content-preview';

export const VueButtonPreview = defineComponent({
	name: 'VueButtonPreview',
	setup() {
		return () => (
			<DocPreview title="Button variants" description="The primary button styles cover high-emphasis actions, secondary actions, and quiet inline controls.">
				<div class="component-preview__stack">
					<div class="button-group">
						<TButton>{{ default: () => 'Default' }}</TButton>
						<TButton variant="secondary">{{ default: () => 'Secondary' }}</TButton>
						<TButton variant="outline">{{ default: () => 'Outline' }}</TButton>
						<TButton variant="ghost">{{ default: () => 'Ghost' }}</TButton>
						<TButton variant="destructive">{{ default: () => 'Destructive' }}</TButton>
						<TButton loading>{{ default: () => 'Loading' }}</TButton>
					</div>
				</div>
			</DocPreview>
		);
	},
});

export const VueInputPreview = defineComponent({
	name: 'VueInputPreview',
	setup() {
		const value = ref('');

		return () => (
			<DocPreview title="Input states" description="Inputs keep label, helper text, and validation messaging aligned without extra form wrappers.">
				<div class="component-preview__stack">
					<TInput
						label="Project name"
						helperText="Used in your dashboard and generated URLs."
						modelValue={value.value}
						onUpdate:modelValue={(nextValue: string) => {
							value.value = nextValue;
						}}
						placeholder="Tile UI Docs"
					/>
					<TInput label="Read-only example" helperText="Use this for immutable values or generated fields." modelValue="tile-ui" />
					<TInput label="Validation example" error="A project name is required before publishing." modelValue="" />
				</div>
			</DocPreview>
		);
	},
});

export const VueTextareaPreview = defineComponent({
	name: 'VueTextareaPreview',
	setup() {
		const value = ref('');

		return () => (
			<DocPreview title="Textarea states" description="Textarea follows the same field structure as Input so forms stay visually and behaviorally consistent.">
				<div class="component-preview__stack">
					<TTextarea
						label="Summary"
						helperText="Keep it short and specific for reviewers."
						modelValue={value.value}
						onUpdate:modelValue={(nextValue: string) => {
							value.value = nextValue;
						}}
						placeholder="Describe the release in one paragraph"
					/>
					<TTextarea label="Validation example" error="Please provide at least 20 characters before submitting." modelValue="Too short" />
				</div>
			</DocPreview>
		);
	},
});

export const VueLabelPreview = defineComponent({
	name: 'VueLabelPreview',
	setup() {
		return () => (
			<DocPreview
				title="Label usage"
				description="Label works as a standalone form primitive and pairs with custom field structures when you do not need the higher-level field components.">
				<div class="component-preview__stack">
					<div class="form-group">
						<TLabel required>{{ default: () => 'Feedback' }}</TLabel>
						<textarea class="component-preview__native-field" placeholder="Type your feedback here" />
					</div>
					<div class="form-group">
						<TLabel>{{ default: () => 'Project slug' }}</TLabel>
						<input class="component-preview__native-field" value="tile-ui" readonly />
					</div>
				</div>
			</DocPreview>
		);
	},
});

export const VueCardPreview = defineComponent({
	name: 'VueCardPreview',
	setup() {
		return () => (
			<DocPreview title="Card composition" description="Card primitives give you a stable surface for headers, content blocks, supporting copy, and action rows.">
				<TCard>
					{{
						default: () => [
							<TCardHeader>
								{{
									default: () => [
										<TCardTitle>{{ default: () => 'Starter workspace' }}</TCardTitle>,
										<TCardDescription>{{ default: () => 'Ship a consistent docs and component experience across React and Vue.' }}</TCardDescription>,
									],
								}}
							</TCardHeader>,
							<TCardContent>
								{{
									default: () => (
										<p class="component-preview__text">
											Use cards for summaries, settings surfaces, marketing CTAs, and denser information blocks that need a clear frame.
										</p>
									),
								}}
							</TCardContent>,
							<TCardFooter>
								{{
									default: () => [<TButton variant="outline">{{ default: () => 'Preview' }}</TButton>, <TButton>{{ default: () => 'Install' }}</TButton>],
								}}
							</TCardFooter>,
						],
					}}
				</TCard>
			</DocPreview>
		);
	},
});

export const VueCopyToClipboardPreview = defineComponent({
	name: 'VueCopyToClipboardPreview',
	setup() {
		const copied = ref(false);

		return () => (
			<VueDocContentPreview
				title="Clipboard interaction"
				description="This mirrors the common UI pattern where the copy action updates local feedback state for a short period.">
				<div class="component-preview__stack">
					<div class="card-link">
						<p class="component-preview__text">Registry URL: https://vue.tileui.zmorg.cn/r/button.json</p>
						<div class="button-group">
							<button
								class="component-preview__action"
								onClick={async () => {
									await navigator.clipboard.writeText('https://vue.tileui.zmorg.cn/r/button.json');
									copied.value = true;
									window.setTimeout(() => {
										copied.value = false;
									}, 1200);
								}}>
								{copied.value ? 'Copied' : 'Copy URL'}
							</button>
						</div>
					</div>
				</div>
			</VueDocContentPreview>
		);
	},
});

export const VueMediaQueryPreview = defineComponent({
	name: 'VueMediaQueryPreview',
	setup() {
		const compact = ref(false);

		return () => (
			<VueDocContentPreview
				title="Responsive branching"
				description="A media-query helper typically drives whether you render a compact mobile variant or a denser desktop layout.">
				<div class="component-preview__stack">
					<div class="button-group">
						<button
							class="component-preview__action"
							onClick={() => {
								compact.value = !compact.value;
							}}>
							Toggle compact mode
						</button>
					</div>
					<div class="card-link">
						<p class="component-preview__text">
							{compact.value
								? 'Compact mode simulates a mobile layout with tighter spacing and fewer secondary controls.'
								: 'Expanded mode simulates a desktop layout with more room for metadata and supporting actions.'}
						</p>
					</div>
				</div>
			</VueDocContentPreview>
		);
	},
});

export const VueLocalStoragePreview = defineComponent({
	name: 'VueLocalStoragePreview',
	setup() {
		const theme = ref<'light' | 'dark'>('light');

		return () => (
			<VueDocContentPreview
				title="Persisted preference example"
				description="A local-storage helper often powers simple user preferences like theme, density, or navigation state.">
				<div class="component-preview__stack">
					<div class="button-group">
						<button
							class="component-preview__action"
							onClick={() => {
								theme.value = 'light';
							}}>
							Light
						</button>
						<button
							class="component-preview__action"
							onClick={() => {
								theme.value = 'dark';
							}}>
							Dark
						</button>
					</div>
					<p class="component-preview__text">
						Current theme preference: <strong>{theme.value}</strong>
					</p>
				</div>
			</VueDocContentPreview>
		);
	},
});

export const VueContactFormPreview = defineComponent({
	name: 'VueContactFormPreview',
	setup() {
		return () => (
			<VueDocContentPreview title="Contact form composition" description="This example combines the registry primitives into a compact, realistic support form surface.">
				<TCard>
					{{
						default: () => [
							<TCardHeader>
								{{
									default: () => [
										<TCardTitle>{{ default: () => 'Contact support' }}</TCardTitle>,
										<TCardDescription>{{ default: () => 'Send a structured request without building the form anatomy from scratch.' }}</TCardDescription>,
									],
								}}
							</TCardHeader>,
							<TCardContent>
								{{
									default: () => (
										<div class="component-preview__stack">
											<TInput label="Email" placeholder="name@company.com" helperText="We reply to the address used here." />
											<TTextarea label="Question" placeholder="Tell us what you need help with" helperText="Include relevant context and links." />
										</div>
									),
								}}
							</TCardContent>,
							<TCardFooter>
								{{
									default: () => [<TButton variant="outline">{{ default: () => 'Cancel' }}</TButton>, <TButton>{{ default: () => 'Submit' }}</TButton>],
								}}
							</TCardFooter>,
						],
					}}
				</TCard>
			</VueDocContentPreview>
		);
	},
});

export const VueNewsletterCardPreview = defineComponent({
	name: 'VueNewsletterCardPreview',
	setup() {
		return () => (
			<VueDocContentPreview
				title="Newsletter signup"
				description="A lightweight marketing capture flow built from the same field and action primitives used elsewhere in the system.">
				<TCard>
					{{
						default: () => [
							<TCardHeader>
								{{
									default: () => [
										<TCardTitle>{{ default: () => 'Stay in the loop' }}</TCardTitle>,
										<TCardDescription>{{ default: () => 'Product updates, release notes, and design system changes once a month.' }}</TCardDescription>,
									],
								}}
							</TCardHeader>,
							<TCardContent>
								{{
									default: () => (
										<div class="component-preview__stack">
											<TInput label="Email" placeholder="you@company.com" helperText="We only send relevant updates." />
										</div>
									),
								}}
							</TCardContent>,
							<TCardFooter>
								{{
									default: () => [<TButton>{{ default: () => 'Subscribe' }}</TButton>],
								}}
							</TCardFooter>,
						],
					}}
				</TCard>
			</VueDocContentPreview>
		);
	},
});

export const VueProfileSettingsPreview = defineComponent({
	name: 'VueProfileSettingsPreview',
	setup() {
		return () => (
			<VueDocContentPreview title="Profile settings" description="A denser account-management surface that still uses the same field, label, and action primitives.">
				<TCard>
					{{
						default: () => [
							<TCardHeader>
								{{
									default: () => [
										<TCardTitle>{{ default: () => 'Profile settings' }}</TCardTitle>,
										<TCardDescription>{{ default: () => 'Update the details your teammates and collaborators see first.' }}</TCardDescription>,
									],
								}}
							</TCardHeader>,
							<TCardContent>
								{{
									default: () => (
										<div class="component-preview__stack">
											<TInput label="Display name" modelValue="Tile UI Team" />
											<TInput label="Email" modelValue="team@tile-ui.dev" />
											<div class="form-group">
												<TLabel>{{ default: () => 'Role' }}</TLabel>
												<input class="component-preview__native-field" value="Design Systems Engineer" />
											</div>
										</div>
									),
								}}
							</TCardContent>,
							<TCardFooter>
								{{
									default: () => [<TButton variant="outline">{{ default: () => 'Cancel' }}</TButton>, <TButton>{{ default: () => 'Save changes' }}</TButton>],
								}}
							</TCardFooter>,
						],
					}}
				</TCard>
			</VueDocContentPreview>
		);
	},
});
