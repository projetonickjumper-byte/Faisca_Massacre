// API Services - Ponto de entrada principal
// Importe os serviços daqui para usar em toda a aplicação

// Configuração
export { API_CONFIG, buildUrl } from "./config"

// HTTP Client
export { httpClient, isMockMode, simulateNetworkDelay } from "./http-client"
export type { ApiResponse, PaginatedResponse } from "./http-client"

// Serviços
export { authService } from "./services/auth.service"
export { workoutsService } from "./services/workouts.service"
export { assessmentsService } from "./services/assessments.service"
export { studentsService } from "./services/students.service"
export { gymsService } from "./services/gyms.service"
export { adminService } from "./services/admin.service"

// ============================================================
// INSTRUÇÕES PARA INTEGRAÇÃO COM BACKEND
// ============================================================
//
// 1. Configure a URL do backend no arquivo .env:
//    NEXT_PUBLIC_API_URL=https://seu-backend.com/api
//
// 2. No arquivo lib/api/config.ts, altere:
//    USE_MOCK: false
//
// 3. Os serviços já estão preparados para fazer chamadas reais.
//    Cada serviço verifica isMockMode() e, se false, usa httpClient.
//
// 4. O httpClient já inclui:
//    - Headers padrão (Content-Type: application/json)
//    - Token de autenticação (se disponível no localStorage)
//    - Tratamento de timeout
//    - Tratamento de erros
//
// 5. Endpoints da API estão definidos em lib/api/config.ts
//    Ajuste conforme necessário para corresponder ao seu backend.
//
// 6. Cada serviço retorna um objeto ApiResponse<T> com:
//    - data: dados da resposta (ou null em caso de erro)
//    - error: mensagem de erro (ou null em caso de sucesso)
//    - status: código HTTP
//    - success: boolean indicando sucesso
//
// 7. Para adicionar novos endpoints:
//    a) Adicione o endpoint em API_CONFIG.ENDPOINTS
//    b) Crie um novo serviço ou adicione método em serviço existente
//    c) Implemente a versão mock primeiro para desenvolvimento
//    d) Adicione a chamada real ao backend
//
// ============================================================
