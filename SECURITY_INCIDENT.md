# 🔐 Security Incident Response - MongoDB & OpenAI Key Leak

## ⚠️ IMMEDIATE ACTIONS REQUIRED

### 1. Rotate MongoDB Credentials (HIGH PRIORITY)
- [ ] Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
- [ ] Navigate to: Database Access → Database Users
- [ ] Find user: `nikhilmetkar583_db_user`
- [ ] Click "Edit" → "Edit Password"
- [ ] Generate a new strong password (use MongoDB's auto-generate feature)
- [ ] Update your local `.env` file with the new connection string
- [ ] Test the connection to ensure it works
- [ ] **Optional but recommended:** Delete the old user and create a new one with a different username

### 2. Rotate OpenAI API Key (HIGH PRIORITY)
- [ ] Go to [OpenAI Platform](https://platform.openai.com/api-keys)
- [ ] Find the key starting with: `sk-proj-rSq3riqKszqLgNhIfKUcIvgfzVudkY0zI7jRFlIGoy...`
- [ ] Click "Revoke" or delete the key
- [ ] Create a new API key
- [ ] Update your local `.env` file with the new key
- [ ] Test your application to ensure it works

### 3. Verify Git History
- [ ] Run: `git log --all --full-history --source --all -S "sk-proj-" -- .`
- [ ] Run: `git log --all --full-history --source --all -S "mongodb+srv://" -- .`
- [ ] If any commits show up, you need to clean Git history (see below)

### 4. Check GitHub Repository
- [ ] Go to your GitHub repository
- [ ] Check if GitHub sent you any security alerts
- [ ] Search your repository for: `sk-proj-` and `mongodb+srv://`
- [ ] If found in any committed files, proceed to "Clean Git History" section

## 🧹 Clean Git History (If Secrets Were Committed)

If you found secrets in your Git history, you have three options:

### Option A: Use BFG Repo-Cleaner (Recommended for existing repos)
```bash
# Install BFG (using Chocolatey on Windows)
choco install bfg-repo-cleaner

# Backup your repository first
git clone --mirror https://github.com/yourusername/algoplus.git algoplus-backup.git

# Remove secrets from history
bfg --replace-text passwords.txt algoplus.git

# Force push (WARNING: This rewrites history)
cd algoplus.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

### Option B: Start Fresh (Easiest for new repos)
```bash
# 1. Delete the GitHub repository
# 2. Remove local .git folder
Remove-Item -Recurse -Force .git

# 3. Re-initialize
git init
git add .
git commit -m "Initial commit: Algoplus - Leetcode Tracker"
git branch -M main
git remote add origin https://github.com/yourusername/algoplus.git
git push -u origin main --force
```

### Option C: Use git-filter-repo
```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove .env from history
git filter-repo --path .env --invert-paths

# Force push
git push --force --all
```

## 📝 Best Practices Going Forward

### 1. Environment Variables Checklist
- [x] `.env` is in `.gitignore` ✅
- [x] Code uses `process.env` or `import.meta.env` ✅
- [x] Created `.env.example` template ✅
- [ ] Never commit actual secrets
- [ ] Use different credentials for dev/staging/production

### 2. Additional Security Measures
- [ ] Enable MongoDB IP whitelist (restrict to your IPs only)
- [ ] Set up MongoDB database user with minimal required permissions
- [ ] Enable MongoDB audit logs
- [ ] Set up OpenAI usage limits and alerts
- [ ] Consider using a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)

### 3. GitHub Security Features
- [ ] Enable GitHub secret scanning alerts
- [ ] Enable Dependabot security updates
- [ ] Review repository security settings

## 🔍 Current Status

### What's Secure:
✅ `.env` file is properly gitignored  
✅ Code correctly uses environment variables  
✅ `.env` was never directly committed to Git  
✅ `.env.example` template created  

### What Needs Action:
⚠️ Rotate MongoDB credentials immediately  
⚠️ Rotate OpenAI API key immediately  
⚠️ Verify no secrets in Git history  
⚠️ Check GitHub repository for any leaked secrets  

## 📞 Support Resources

- **MongoDB Support:** https://www.mongodb.com/support
- **OpenAI Support:** https://help.openai.com/
- **GitHub Security:** https://docs.github.com/en/code-security

## 📅 Incident Timeline

- **Discovered:** December 1, 2025
- **Credentials Rotated:** [PENDING]
- **Git History Cleaned:** [PENDING if needed]
- **Incident Resolved:** [PENDING]

---

**Remember:** Even if the secrets weren't in Git history, they may have been exposed through other means (screenshots, logs, error messages, etc.). Always rotate credentials when in doubt.
