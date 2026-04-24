variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
}

variable "public_subnet_cidr" {
  type        = string
  description = "CIDR block for the public subnet"
}

variable "private_subnet_cidr" {
  type        = string
  description = "CIDR block for the private subnet"
}

variable "availability_zone1" {
  type        = string
  description = "AZ to deploy subnets in"
}

variable "availability_zone2" {
  type        = string
  description = "AZ to deploy subnets in"
}

variable "env" {
  type        = string
  description = "Environment name (e.g. dev, prod)"
  default     = "dev"
}