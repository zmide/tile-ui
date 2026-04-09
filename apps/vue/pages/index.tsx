import { defineComponent, ref } from 'vue';
import {
  TButton,
  TInput,
  TTextarea,
  TLabel,
  TCard,
  TCardHeader,
  TCardTitle,
  TCardDescription,
  TCardContent,
  TCardFooter,
} from '@tile-ui/vue';
import { vueHomeLinks } from '../../common/lib/docs';

export default defineComponent({
  name: 'VueHomePage',
  setup() {
    const inputValue = ref('');
    const textareaValue = ref('');

    return () => (
      <main class="docs-shell">
        <section class="hero">
          <p class="eyebrow">Tile UI Vue</p>
          <h1>Vue components, registry items, and examples.</h1>
          <p class="lede">
            A Vue-focused documentation surface for Tile UI. Install the package, browse registry items, and
            preview the component primitives that power the design system.
          </p>
        </section>

        <section class="card-grid">
          {vueHomeLinks.map((section) => (
            <NuxtLink key={section.href} to={section.href} class="card-link">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </NuxtLink>
          ))}
        </section>

        <section class="showcase-shell">
          <div class="showcase-header">
            <p class="eyebrow">Component Showcase</p>
            <h2>Preview the Vue building blocks.</h2>
            <p class="showcase-copy">
              The same primitives are available from the package and from the Vue registry hosted on this site.
            </p>
          </div>

          <div class="showcase-grid">
            <TCard>
              {{
                default: () => [
                  <TCardHeader>
                    {{
                      default: () => [
                        <TCardTitle>{{ default: () => 'Buttons' }}</TCardTitle>,
                        <TCardDescription>{{ default: () => 'Variants, sizes, and loading state.' }}</TCardDescription>,
                      ],
                    }}
                  </TCardHeader>,
                  <TCardContent>
                    {{
                      default: () => (
                        <div class="button-group">
                          <TButton>{{ default: () => 'Default' }}</TButton>
                          <TButton variant="outline">{{ default: () => 'Outline' }}</TButton>
                          <TButton variant="secondary">{{ default: () => 'Secondary' }}</TButton>
                          <TButton variant="destructive">{{ default: () => 'Destructive' }}</TButton>
                          <TButton loading>{{ default: () => 'Loading' }}</TButton>
                        </div>
                      ),
                    }}
                  </TCardContent>,
                ],
              }}
            </TCard>

            <TCard>
              {{
                default: () => [
                  <TCardHeader>
                    {{
                      default: () => [
                        <TCardTitle>{{ default: () => 'Inputs' }}</TCardTitle>,
                        <TCardDescription>{{ default: () => 'Shared label, helper text, and error affordances.' }}</TCardDescription>,
                      ],
                    }}
                  </TCardHeader>,
                  <TCardContent>
                    {{
                      default: () => (
                        <div class="form-group">
                          <TInput
                            label="Username"
                            placeholder="Enter your username"
                            modelValue={inputValue.value}
                            onUpdate:modelValue={(value: string) => {
                              inputValue.value = value;
                            }}
                          />
                          <TInput label="Email" type="email" placeholder="you@example.com" helperText="We will never share it." />
                          <TInput label="Error state" error="Username already exists" modelValue="tile" />
                        </div>
                      ),
                    }}
                  </TCardContent>,
                ],
              }}
            </TCard>

            <TCard>
              {{
                default: () => [
                  <TCardHeader>
                    {{
                      default: () => [
                        <TCardTitle>{{ default: () => 'Textarea + Label' }}</TCardTitle>,
                        <TCardDescription>{{ default: () => 'Composable form surfaces for multi-line input.' }}</TCardDescription>,
                      ],
                    }}
                  </TCardHeader>,
                  <TCardContent>
                    {{
                      default: () => (
                        <div class="form-group">
                          <div class="form-group">
                            <TLabel required>{{ default: () => 'Feedback' }}</TLabel>
                            <TTextarea
                              placeholder="Share what you are building..."
                              modelValue={textareaValue.value}
                              onUpdate:modelValue={(value: string) => {
                                textareaValue.value = value;
                              }}
                            />
                          </div>
                          <TTextarea label="Validation" error="Please enter at least 10 characters." modelValue="Too short" />
                        </div>
                      ),
                    }}
                  </TCardContent>,
                  <TCardFooter>
                    {{
                      default: () => [
                        <TButton variant="outline">{{ default: () => 'Cancel' }}</TButton>,
                        <TButton>{{ default: () => 'Save' }}</TButton>,
                      ],
                    }}
                  </TCardFooter>,
                ],
              }}
            </TCard>
          </div>

          <div class="showcase-footer">
            Tile UI Vue combines a shared SCSS design system with framework-specific ergonomics and registry-driven distribution.
          </div>
        </section>
      </main>
    );
  },
});
