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
import styles from './index.module.scss';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const inputValue = ref('');
    const textareaValue = ref('');

    return () => (
      <main class={styles.main}>
        <div class={styles.container}>
          <header class={styles.header}>
            <h1 class={styles.title}>Tile UI</h1>
            <p class={styles.subtitle}>
              基于 SCSS + CSS Module + Hooks API 的轻量级 Vue 组件库
            </p>
          </header>

          {/* Button 按钮组件 */}
          <section class={styles.section}>
            <h2 class={styles.sectionTitle}>Button 按钮组件</h2>
            <div class={styles.demoGrid}>
              <TCard>
                {{
                  default: () => [
                    <TCardHeader>
                      {{
                        default: () => [
                          <TCardTitle>{{ default: () => '按钮变体' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '展示不同样式的按钮变体' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.buttonGroup}>
                            <TButton variant="default">{{ default: () => '默认按钮' }}</TButton>
                            <TButton variant="destructive">{{ default: () => '危险按钮' }}</TButton>
                            <TButton variant="outline">{{ default: () => '轮廓按钮' }}</TButton>
                            <TButton variant="secondary">{{ default: () => '次要按钮' }}</TButton>
                            <TButton variant="ghost">{{ default: () => '幽灵按钮' }}</TButton>
                            <TButton variant="link">{{ default: () => '链接按钮' }}</TButton>
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
                          <TCardTitle>{{ default: () => '按钮尺寸' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '展示不同尺寸的按钮' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.buttonGroup}>
                            <TButton size="sm">{{ default: () => '小按钮' }}</TButton>
                            <TButton size="default">{{ default: () => '默认按钮' }}</TButton>
                            <TButton size="lg">{{ default: () => '大按钮' }}</TButton>
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
                          <TCardTitle>{{ default: () => '按钮状态' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '展示不同状态的按钮' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.buttonGroup}>
                            <TButton>{{ default: () => '正常按钮' }}</TButton>
                            <TButton disabled>{{ default: () => '禁用按钮' }}</TButton>
                            <TButton loading>{{ default: () => '加载中' }}</TButton>
                          </div>
                        ),
                      }}
                    </TCardContent>,
                  ],
                }}
              </TCard>
            </div>
          </section>

          {/* Input 输入框组件 */}
          <section class={styles.section}>
            <h2 class={styles.sectionTitle}>Input 输入框组件</h2>
            <div class={styles.demoGrid}>
              <TCard>
                {{
                  default: () => [
                    <TCardHeader>
                      {{
                        default: () => [
                          <TCardTitle>{{ default: () => '基础输入框' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '展示不同状态的输入框' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.formGroup}>
                            <TInput
                              modelValue={inputValue.value}
                              onUpdate:modelValue={(v: string) => { inputValue.value = v; }}
                              label="用户名"
                              placeholder="请输入用户名"
                            />
                            <TInput
                              label="邮箱"
                              type="email"
                              placeholder="请输入邮箱"
                              helperText="我们将保护您的隐私"
                            />
                            <TInput
                              label="错误状态"
                              error="用户名已存在"
                              modelValue="admin"
                            />
                          </div>
                        ),
                      }}
                    </TCardContent>,
                  ],
                }}
              </TCard>
            </div>
          </section>

          {/* Textarea 文本域组件 */}
          <section class={styles.section}>
            <h2 class={styles.sectionTitle}>Textarea 文本域组件</h2>
            <div class={styles.demoGrid}>
              <TCard>
                {{
                  default: () => [
                    <TCardHeader>
                      {{
                        default: () => [
                          <TCardTitle>{{ default: () => '文本域' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '多行文本输入组件' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.formGroup}>
                            <TTextarea
                              modelValue={textareaValue.value}
                              onUpdate:modelValue={(v: string) => { textareaValue.value = v; }}
                              label="评论"
                              placeholder="请输入您的评论..."
                              required
                            />
                            <TTextarea
                              label="错误示例"
                              error="内容不能少于10个字符"
                              modelValue="太短"
                            />
                          </div>
                        ),
                      }}
                    </TCardContent>,
                  ],
                }}
              </TCard>
            </div>
          </section>

          {/* Label 标签组件 */}
          <section class={styles.section}>
            <h2 class={styles.sectionTitle}>Label 标签组件</h2>
            <div class={styles.demoGrid}>
              <TCard>
                {{
                  default: () => [
                    <TCardHeader>
                      {{
                        default: () => [
                          <TCardTitle>{{ default: () => '标签' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '与其他表单组件配合使用' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{
                        default: () => (
                          <div class={styles.formGroup}>
                            <div>
                              <TLabel required>{{ default: () => '用户名' }}</TLabel>
                              <TInput placeholder="请输入用户名" />
                            </div>
                            <div>
                              <TLabel>{{ default: () => '密码' }}</TLabel>
                              <TInput type="password" placeholder="请输入密码" />
                            </div>
                          </div>
                        ),
                      }}
                    </TCardContent>,
                  ],
                }}
              </TCard>
            </div>
          </section>

          {/* Card 卡片组件 */}
          <section class={styles.section}>
            <h2 class={styles.sectionTitle}>Card 卡片组件</h2>
            <div class={styles.demoGrid}>
              <TCard>
                {{
                  default: () => [
                    <TCardHeader>
                      {{
                        default: () => [
                          <TCardTitle>{{ default: () => '卡片标题' }}</TCardTitle>,
                          <TCardDescription>{{ default: () => '这是一个卡片描述，提供更多上下文信息' }}</TCardDescription>,
                        ],
                      }}
                    </TCardHeader>,
                    <TCardContent>
                      {{ default: () => <p>卡片内容区域，可以放置任何内容。</p> }}
                    </TCardContent>,
                    <TCardFooter>
                      {{
                        default: () => [
                          <TButton variant="outline">{{ default: () => '取消' }}</TButton>,
                          <TButton>{{ default: () => '确认' }}</TButton>,
                        ],
                      }}
                    </TCardFooter>,
                  ],
                }}
              </TCard>
            </div>
          </section>

          <footer class={styles.footer}>
            <p>Tile UI - 轻量级 React + Vue 双架构组件库 | 基于 SCSS + CSS Module</p>
          </footer>
        </div>
      </main>
    );
  },
});
