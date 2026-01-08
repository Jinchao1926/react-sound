# 包体积优化记录

## 优化前基准（2026-01-05）

### 总体包大小
- **总体积**: 779 kB (原始) / 264 kB (gzip)
- **分析报告**: [stats-baseline-2026-01-05.html](./stats-baseline-2026-01-05.html)

### 各包大小详情

| 包名 | 原始大小 | Gzip大小 | 占比 |
|------|---------|----------|------|
| ui-vendor (antd + @ant-design/icons) | 435.78 kB | 137.80 kB | 56.0% |
| react-vendor | 162.93 kB | 53.18 kB | 20.9% |
| index | 142.24 kB | 61.47 kB | 18.3% |
| state-vendor | 37.58 kB | 11.54 kB | 4.8% |

### Antd 使用情况

使用了 5 个组件和 1 个图标：
- Input (搜索框)
- Carousel (轮播图，3 处)
- Pagination (分页)
- Popover (弹出框)
- Tooltip (提示框)
- SearchOutlined (图标)

---

## 优化 1: 完全移除 Antd（2026-01-07）

### 方法
替换所有 Antd 组件为自定义实现：
- Tooltip
- Popover
- Input
- SearchIcon
- Carousel
- Pagination

### 结果

| 指标 | 优化前 | 优化后 | 减少量 | 优化比例 |
|------|--------|--------|--------|----------|
| 总体积 (原始) | 779 kB | 365.31 kB | 413.69 kB | **-53.1%** |
| 总体积 (gzip) | 264 kB | 151.55 kB | 112.45 kB | **-42.6%** |

**主要变化:**
- ✅ ui-vendor 完全移除 (435.78 kB → 0)
- ✅ 自定义组件总计 ~20 kB，节省 **95.4%** 空间
- ✅ 主应用代码仅增加 2.8 kB

**分析报告**: [stats-remove-antd-2026-01-07.html](./stats-remove-antd-2026-01-07.html)

