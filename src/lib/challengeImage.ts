
/**
 * Generates a Brutalist-style challenge image using Canvas.
 */
export async function generateChallengeImage(gameTitle: string, score: string | number): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Colors
  const colors = {
    dark: '#000000',
    gold: '#FFE600',
    orange: '#FF2E93',
    cream: '#F0F4F8',
    blue: '#00E5FF',
    green: '#00FF66',
  };

  // 1. Background
  ctx.fillStyle = colors.cream;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Grid Pattern
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.lineWidth = 2;
  const gridSize = 80;
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 3. Main Card Shadow
  ctx.fillStyle = colors.dark;
  ctx.fillRect(110, 110, 900, 900);

  // 4. Main Card
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = colors.dark;
  ctx.lineWidth = 12;
  ctx.fillRect(100, 100, 900, 900);
  ctx.strokeRect(100, 100, 900, 900);

  // 5. Header Bar
  ctx.fillStyle = colors.gold;
  ctx.fillRect(100, 100, 900, 150);
  ctx.strokeRect(100, 100, 900, 150);

  // 6. Title Text
  ctx.font = '900 80px Poppins, sans-serif';
  ctx.fillStyle = colors.dark;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CHALLENGE ACCEPTED', 550, 175);

  // 7. Game Name Section
  ctx.font = '800 50px Poppins, sans-serif';
  ctx.fillText(gameTitle.toUpperCase(), 550, 320);
  
  // Decorative line under game name
  ctx.beginPath();
  ctx.moveTo(300, 350);
  ctx.lineTo(800, 350);
  ctx.stroke();

  // 8. Score Section
  // Big Score Box
  ctx.fillStyle = colors.blue;
  ctx.fillRect(200, 420, 700, 350);
  ctx.strokeRect(200, 420, 700, 350);
  
  ctx.font = '900 60px Poppins, sans-serif';
  ctx.fillStyle = colors.dark;
  ctx.fillText('YOUR SCORE', 550, 480);

  ctx.font = '900 220px Poppins, sans-serif';
  ctx.fillText(score.toString(), 550, 630);

  // 9. Footer / Call to Action
  ctx.fillStyle = colors.orange;
  ctx.fillRect(250, 820, 600, 120);
  ctx.strokeRect(250, 820, 600, 120);
  
  ctx.font = '900 50px Poppins, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('CAN YOU BEAT ME?', 550, 880);

  // 10. Branding
  ctx.font = '800 30px Poppins, sans-serif';
  ctx.fillStyle = colors.dark;
  ctx.textAlign = 'right';
  ctx.fillText('BRUTALIST GAME HUB', 950, 980);

  return canvas.toDataURL('image/png');
}
