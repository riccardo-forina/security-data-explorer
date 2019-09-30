
export interface IReference {
  description: string;
  type: string;
  url: string;
}

export interface IDocumentReferences {
  reference: IReference[];
}

export interface IIdentification {
  id: string;
}

export interface IRevision {
  date: Date;
  number: string;
  description: string;
}

export interface IRevisionHistory {
  revision: IRevision;
}

export interface IGenerator {
  date: Date;
  engine: string;
}

export interface IDocumentTracking {
  initial_release_date: Date;
  identification: IIdentification;
  revision_history: IRevisionHistory;
  generator: IGenerator;
  current_release_date: Date;
  version: string;
  status: string;
}

export interface IRelationship {
  relates_to_product_reference: string;
  product_reference: string;
  full_product_name: string;
  relation_type: string;
}


export interface IBranch {
  name: string;
  type: string;
  branch: IBranch[];
  full_product_name: string;
}

export interface IProductTree {
  relationship: IRelationship[];
  branch: IBranch[];
}

export interface IDocumentPublisher {
  issuing_authority: string;
  contact_details: string;
  type: string;
}

export interface INotes {
  note: string;
}

export interface IReferences {
  reference: IReference[];
}

export interface IInvolvement {
  party: string;
  status: string;
}

export interface IInvolvements {
  involvement: IInvolvement;
}

export interface IStatus {
  product_id: string[];
  type: string;
}

export interface IProductStatuses {
  status: IStatus;
}

export interface IRemediation {
  description: string;
  type: string;
  url: string;
}

export interface IRemediations {
  remediation: IRemediation;
}

export interface IThreat {
  description: string;
  type: string;
}

export interface IThreats {
  threat: IThreat;
}

export interface IAcknowledgment {
  description: string;
}

export interface IAcknowledgments {
  acknowledgment: IAcknowledgment;
}

export interface IVulnerability {
  notes: INotes;
  cve: string;
  references: IReferences;
  release_date: Date;
  involvements: IInvolvements;
  product_statuses: IProductStatuses;
  remediations: IRemediations;
  threats: IThreats;
  discovery_date: Date;
  ordinal: string;
  acknowledgments?: IAcknowledgments;
}

export interface IDocumentNotes {
  note: string[];
}

export interface ICVRF {
  document_title: string;
  document_distribution: string;
  document_references: IDocumentReferences;
  aggregate_severity: string;
  document_tracking: IDocumentTracking;
  product_tree?: IProductTree;
  document_publisher: IDocumentPublisher;
  vulnerability?: IVulnerability[];
  document_notes: IDocumentNotes;
  document_type: string;
}

export interface ICVRFListItem {
  released_on: string;
  severity: string;
  RHSA: string;
  CVEs: string[];
  released_packages: string[],
  oval: {
    has_oval: boolean;
    resource_url?: string;
  }
}
