provider "aws" {
  region = "eu-north-1"
}

# ─── VARIABLES ───────────────────────────────────────────────────────────────

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# ─── VPC MODULE ──────────────────────────────────────────────────────────────

module "vpc" {
  source = "./modules/vpc"

  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidr  = "10.0.1.0/24"
  private_subnet_cidr = "10.0.2.0/24"
  availability_zone1  = "eu-north-1a"
  availability_zone2  = "eu-north-1b"
  env                 = "dev"
}

# ─── SECURITY GROUPS MODULE ─────────────────────────────────────────────────

module "securitygrps" {
  source = "./modules/securitygrps"

  vpc_id             = module.vpc.vpc_id
  public_subnet_cidr = "10.0.1.0/24"
  ssh_cidr           = "0.0.0.0/0"   # lock this down to your IP in production
  env                = "dev"
}

# ─── EC2 INSTANCES MODULE ───────────────────────────────────────────────────

module "instances" {
  source = "./modules/instances"

  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.micro"
  public_subnet_id   = module.vpc.public_subnet_id
  public_sg_id       = module.securitygrps.public_sg_id
  private_sg_id      = module.securitygrps.private_sg_id
  key_name           = "mywebserver-key"
  env                = "dev"
}

# ─── OUTPUTS ─────────────────────────────────────────────────────────────────

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_sg_id" {
  value = module.securitygrps.public_sg_id
}

output "private_sg_id" {
  value = module.securitygrps.private_sg_id
}

output "public_instance_ip" {
  value       = module.instances.public_instance_public_ip
  description = "Public IP — access frontend at http://<this-ip>:3000"
}

output "private_instance_ip" {
  value       = module.instances.private_instance_private_ip
  description = "Private IP of the backend instance"
}