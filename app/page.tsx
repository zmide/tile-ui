'use client';

import React, { useState } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';
import { Textarea } from '@/registry/new-york/ui/textarea';
import { Label } from '@/registry/new-york/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/registry/new-york/ui/card';
import styles from './page.module.scss';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Tile UI</h1>
          <p className={styles.subtitle}>
            基于 SCSS + CSS Module + Hooks API 的轻量级 React 组件库
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Button 按钮组件</h2>
          <div className={styles.demoGrid}>
            <Card>
              <CardHeader>
                <CardTitle>按钮变体</CardTitle>
                <CardDescription>展示不同样式的按钮变体</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.buttonGroup}>
                  <Button variant="default">默认按钮</Button>
                  <Button variant="destructive">危险按钮</Button>
                  <Button variant="outline">轮廓按钮</Button>
                  <Button variant="secondary">次要按钮</Button>
                  <Button variant="ghost">幽灵按钮</Button>
                  <Button variant="link">链接按钮</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>按钮尺寸</CardTitle>
                <CardDescription>展示不同尺寸的按钮</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.buttonGroup}>
                  <Button size="sm">小按钮</Button>
                  <Button size="default">默认按钮</Button>
                  <Button size="lg">大按钮</Button>
                  <Button size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>按钮状态</CardTitle>
                <CardDescription>展示不同状态的按钮</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.buttonGroup}>
                  <Button>正常按钮</Button>
                  <Button disabled>禁用按钮</Button>
                  <Button loading>加载中</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Input 输入框组件</h2>
          <div className={styles.demoGrid}>
            <Card>
              <CardHeader>
                <CardTitle>基础输入框</CardTitle>
                <CardDescription>展示不同状态的输入框</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.formGroup}>
                  <Input
                    label="用户名"
                    placeholder="请输入用户名"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    label="邮箱"
                    type="email"
                    placeholder="请输入邮箱"
                    helperText="我们将保护您的隐私"
                  />
                  <Input
                    label="错误状态"
                    error="用户名已存在"
                    defaultValue="admin"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Textarea 文本域组件</h2>
          <div className={styles.demoGrid}>
            <Card>
              <CardHeader>
                <CardTitle>文本域</CardTitle>
                <CardDescription>多行文本输入组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.formGroup}>
                  <Textarea
                    label="评论"
                    placeholder="请输入您的评论..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    required
                  />
                  <Textarea
                    label="错误示例"
                    error="内容不能少于10个字符"
                    defaultValue="太短"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Label 标签组件</h2>
          <div className={styles.demoGrid}>
            <Card>
              <CardHeader>
                <CardTitle>标签</CardTitle>
                <CardDescription>与其他表单组件配合使用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.formGroup}>
                  <div>
                    <Label required>用户名</Label>
                    <Input placeholder="请输入用户名" />
                  </div>
                  <div>
                    <Label>密码</Label>
                    <Input type="password" placeholder="请输入密码" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Card 卡片组件</h2>
          <div className={styles.demoGrid}>
            <Card>
              <CardHeader>
                <CardTitle>卡片标题</CardTitle>
                <CardDescription>这是一个卡片描述，提供更多上下文信息</CardDescription>
              </CardHeader>
              <CardContent>
                <p>卡片内容区域，可以放置任何内容。</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">取消</Button>
                <Button>确认</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Tile UI - 轻量级 React 组件库 | 基于 SCSS + CSS Module + Hooks API</p>
        </footer>
      </div>
    </main>
  );
}
