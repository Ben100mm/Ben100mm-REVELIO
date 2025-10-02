# CRITICAL PORT CONFIGURATION - NEVER CHANGE

## **MANDATORY PORT ASSIGNMENTS**

### **Frontend (Next.js)**
- **Port**: `6001`
- **URL**: `http://localhost:6001`
- **Configuration**: `frontend/package.json` - `"dev": "next dev -p 6001"`

### **Backend API**
- **Port**: `6002`
- **URL**: `http://localhost:6002`
- **Configuration**: `backend/src/index.ts` - `PORT = process.env.PORT || 6002`
- **Configuration**: `backend/src/simple-server.ts` - `PORT = process.env.PORT || 6002`

## **IMPORTANT RULES**

1. **NEVER** change these port assignments
2. **ALWAYS** use these exact ports for development
3. **ALWAYS** update documentation when referencing these ports
4. **ALWAYS** ensure CORS and API configurations match these ports

## **Configuration Files Updated**

- `frontend/package.json` - Frontend dev script
- `backend/src/index.ts` - Main backend server
- `backend/src/simple-server.ts` - Simple backend server
- `frontend/src/services/api.ts` - API base URL
- `backend/env.example` - Environment variables
- `scripts/setup-project.sh` - Setup documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation docs

## **Quick Reference**

```bash
# Start Frontend (Port 6001)
cd frontend && npm run dev

# Start Backend (Port 6002)
cd backend && npx ts-node src/simple-server.ts

# Access Points
Frontend: http://localhost:6001
Backend:  http://localhost:6002
Health:   http://localhost:6002/health
```

---
**Created**: 2025-10-02  
**Status**: PERMANENT CONFIGURATION - DO NOT MODIFY
