variable "ami_id" {
  type        = string
  description = "AMI ID for the EC2 instances (Amazon Linux 2)"
  default="ami-0a0823e4ea064404d"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "public_subnet_id" {
  type        = string
  description = "ID of the public subnet"
}



variable "public_sg_id" {
  type        = string
  description = "Security group ID for the public instance"
}

variable "private_sg_id" {
  type        = string
  description = "Security group ID for the private instance"
}

variable "key_name" {
  type        = string
  description = "Name of an existing AWS key pair for SSH access"
  default     = "mywebserver-key"
}


variable "env" {
  type        = string
  description = "Environment name (e.g. dev, prod)"
  default     = "dev"
}

variable "docker_image_tag" {
  description = "Docker image tag to deploy (commit SHA from CI/CD, or 'latest' for local runs)"
  type        = string
  default     = "latest"
}
