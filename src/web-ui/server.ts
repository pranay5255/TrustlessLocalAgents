import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/deploy', async (req, res) => {
  const { agentName, agentDescription, agentWallet, openRouterKey } = req.body;
  
  // Here we would invoke the CLI logic or generator function directly
  // For now, we'll simulate the deployment process
  
  try {
    // 1. Create project directory
    const projectDir = path.join(process.cwd(), 'agents', agentName.toLowerCase().replace(/\s+/g, '-'));
    await fs.mkdir(projectDir, { recursive: true });
    
    // 2. Generate configuration (simulated)
    const envContent = `
ADDRESS=${agentWallet}
OPENROUTER_API_KEY=${openRouterKey}
OPENROUTER_MODEL=openai/gpt-4o-mini
`;
    await fs.writeFile(path.join(projectDir, '.env'), envContent);
    
    // 3. Return success
    res.json({
      success: true,
      message: `Agent "${agentName}" created successfully!`,
      path: projectDir,
      instructions: "Run 'docker-compose up' in the agent directory to start."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
});

app.listen(port, () => {
  console.log(`Web UI running at http://localhost:${port}`);
});
