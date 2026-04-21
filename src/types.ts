import { ReactNode } from 'react';

/**
 * @interface ThreatEvent
 * Representa um evento de ameaça cyber-física no ecossistema PetroShield.
 * Alinhado com a taxonomia MITRE ATT&CK para ICS (Sistemas de Controle Industrial).
 */
export interface ThreatEvent {
  id: string; // Identificador único do incidente (ex: TH-001)
  timestamp: string; // Marca temporal em formato ISO
  source: string; // Origem detectada (nó de borda, refinaria, VLAN)
  type: string; // Classificação da ameaça (ex: SCADA_LATERAL_MOVEMENT)
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; // Nível de impacto operacional
  description: string; // Narrativa técnica detalhada do incidente
  payload?: string; // Payload ou assinatura forense detectada (mock)
  mitigation?: string; // Estratégia de mitigação macro
  mitigationSteps?: string[]; // Passos detalhados para cada agente do pool
}

/**
 * @type SOCPhase
 * Define o ciclo de vida de um incidente orquestrado por agentes autônomos.
 * Baseado em modelos de LangGraph para fluxos de decisão iterativos.
 */
export type SOCPhase = 
  | 'INITIALIZING'  // Boot inicial do framework
  | 'MONITOR'       // Ingestão de telemetria SCADA/IoT
  | 'HUNT'          // Caça proativa de anomalias heurísticas
  | 'DETECT'        // Reconhecimento de padrão de ataque
  | 'ANALYSE'       // Análise cognitiva (Gemini AI Inference)
  | 'RESPOND'       // Execução de contramedidas (DLP/LockShield)
  | 'IR_RECOVERY'   // Estabilização de nós e integridade de firmware
  | 'LESSONS_LEARNT'// Indexação RAG e reporte executivo
  | 'STANDBY';      // Estado de repouso e monitoramento passivo

/**
 * @interface SOCState
 * O "Single Source of Truth" do estado global da aplicação.
 * Implementado como um Store centralizado para simular memória de curto prazo (Short-term context).
 */
export interface SOCState {
  phase: SOCPhase;
  currentIncident: ThreatEvent | null;
  logs: LogEntry[];
  metrics: SOCMetrics;
  connectedAgents: string[];
}

/**
 * @interface SOCMetrics
 * Estrutura de dados para KPIs de cibersegurança e ROI de infraestrutura.
 */
export interface SOCMetrics {
  threatsBlocked: number;     // Contador acumulado de ameaças neutralizadas
  uptimeEvaded: number;       // Horas de downtime de refino evitadas
  moneySafeguarded: number;   // Valor financeiro protegido em BRL (R$)
  complianceStatus: number;   // Índice de conformidade regulatória (LGPD)
  networkHealth: number;      // Saúde da rede (entropia/anomalia) 0-100
}

/**
 * @interface LogEntry
 * Registro de auditoria gerado pelos agentes ou pelo núcleo do sistema.
 */
export interface LogEntry {
  id: string;
  timestamp: string;
  agent: string; // Nome do agente que gerou o log
  message: string; // Texto instrutivo ou alerta
  type: 'system' | 'agent' | 'alert' | 'tool' | 'rag'; // Categoria semântica para UI
}
