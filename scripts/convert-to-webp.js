const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

// 转换所有大于 15KB 的图片
const images = [
  // 已转换的大图片
  'src/assets/img/download/download_bg.png',
  'src/assets/img/download/mobile.png',
  'src/assets/img/download/pc.png',
  // 新增：中大型图片
  'src/components/Core/Spirit/img/footer2.png',
  'src/components/Core/Spirit/img/cover.png',
  'src/components/Core/Spirit/img/footer.png',
  'src/assets/img/dis_vip_card.png',
  'src/components/Core/Spirit/img/button.png',
  'src/components/Core/Spirit/img/login_bg2.png',
  'src/components/Core/Spirit/img/login_bg.png',
  'src/components/Core/Spirit/img/download_bg.png',
  'src/assets/img/download/social.png',
  'src/assets/img/download/stars.png',
  'src/assets/img/download/mac.png',
  'src/components/Core/Spirit/img/icon2.png',
  'src/assets/img/download/music_cover.png',
]

async function convertToWebp() {
  let totalOriginalSize = 0
  let totalWebpSize = 0

  for (const imagePath of images) {
    const fullPath = path.join(__dirname, '..', imagePath)
    const outputPath = imagePath.replace('.png', '.webp')
    const fullOutputPath = path.join(__dirname, '..', outputPath)

    try {
      // 获取原始文件大小
      const stats = fs.statSync(fullPath)
      totalOriginalSize += stats.size

      await sharp(fullPath)
        .webp({ quality: 75 })
        .toFile(fullOutputPath)

      // 获取 WebP 文件大小
      const webpStats = fs.statSync(fullOutputPath)
      totalWebpSize += webpStats.size

      const saved = ((1 - webpStats.size / stats.size) * 100).toFixed(1)
      console.log(`✅ ${path.basename(imagePath)}: ${(stats.size / 1024).toFixed(1)}KB → ${(webpStats.size / 1024).toFixed(1)}KB (节省 ${saved}%)`)
    } catch (error) {
      console.error(`❌ Error converting ${imagePath}:`, error.message)
    }
  }

  const totalSaved = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)
  console.log(`\n📊 总计: ${(totalOriginalSize / 1024).toFixed(1)}KB → ${(totalWebpSize / 1024).toFixed(1)}KB`)
  console.log(`💰 节省: ${((totalOriginalSize - totalWebpSize) / 1024).toFixed(1)}KB (${totalSaved}%)`)
}

convertToWebp()
