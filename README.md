# Login Critter Demo - 高级登录小怪兽动画演示

这是一个基于 **Next.js** 和 **Framer Motion** 构建的高级登录交互演示项目。它参考了 CareerCompass 的视觉风格，并在此基础上实现了更加灵动、具有物理质感的角色动画。
<img width="1943" height="977" alt="image" src="https://github.com/user-attachments/assets/d21db35d-b9dd-416a-9384-de2c2379ea67" />


## ✨ 核心特性

- **物理探头倾斜 (Dynamic Skewing)**：
  - 角色采用 `skewX` 变换配合 `transform-origin: center bottom`，模拟从地面长出来的摆动感。
  - 倾斜角度随输入状态和文字长度动态调整。

- **动态长度拉伸 (Height Stretching)**：
  - 输入账号（Email）时，角色高度会随着文字长度增加而纵向拉伸，呈现出“努力窥探”的视觉效果。

- **个体眼睑系统 (Individual Eyelid System)**：
  - 每个角色的眼睛都拥有独立的眼睑层，彻底解决了遮罩层导致眼睛消失的 Bug。
  - **隐私避嫌**：点击“展示密码”时，所有角色会自动闭眼并看向左侧，不再盯着表单看。
  - **周期偷窥**：在隐藏密码状态下，紫色角色会间歇性半开眼睑（40%）进行“偷瞄”。

- **全局随机眨眼 (Global Blinking)**：
  - 角色拥有随机眨眼逻辑（3-7秒间隔），使界面看起来充满生命力。

- **精准眼神追踪 (Pupil Clamping)**：
  - 瞳孔实时追踪鼠标位置，并内置了物理碰撞算法（Clamping），确保瞳孔不会移出眼眶。

## 🛠 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **字体**: Inter, Google Fonts

## 🚀 快速开始

### 1. 克隆与安装

```bash
git clone <your-repo-url>
cd login-critter-demo
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可预览。

## 📝 交互指南

1. **输入邮箱**：观察左侧角色如何随着你打字而努力“长高”和“探头”。
2. **输入密码**：所有角色会感到羞涩并闭上眼睑，其中紫色大个子会不时地睁眼偷瞄你。
3. **点击眼睛图标**：角色会迅速缩回并看向左侧，展现出“我在保护你的隐私”的行为逻辑。
4. **随机眨眼**：即使你不操作，小怪兽们也会偶尔眨眨眼。

