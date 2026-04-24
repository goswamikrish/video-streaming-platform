variable "vpc_id" {
  type        = string
  description = "ID of the VPC to create the security groups in"
}

variable "public_subnet_cidr" {
  type        = string
  description = "CIDR block of the public subnet (used to restrict private SG ingress)"
}

variable "ssh_cidr" {
  type        = string
  description = "CIDR block allowed for SSH access to public instance"
  default     = "0.0.0.0/0"
}

variable "env" {
  type        = string
  description = "Environment name (e.g. dev, prod)"
  default     = "dev"
}
