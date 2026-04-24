# ─── PUBLIC SECURITY GROUP (Web + SSH) ───────────────────────────────────────

resource "aws_security_group" "public" {
  name        = "${var.env}-public-sg"
  description = "Allow HTTP, HTTPS, and SSH inbound traffic"
  vpc_id      = var.vpc_id

  # ─── INBOUND RULES ──────────────────────────────────────────────────────────

  # SSH
  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  # HTTP
  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend (Nginx serves on port 3000)
  ingress {
    description = "Allow frontend traffic"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # API Proxy (port 4000)
  ingress {
    description = "Allow API proxy traffic"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ─── OUTBOUND RULES ─────────────────────────────────────────────────────────

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.env}-public-sg"
    Environment = var.env
  }
}

# ─── PRIVATE SECURITY GROUP (Backend) ────────────────────────────────────────

resource "aws_security_group" "private" {
  name        = "${var.env}-private-sg"
  description = "Allow backend traffic from public subnet only"
  vpc_id      = var.vpc_id

  # Allow backend traffic (port 5000) from the public subnet
  ingress {
    description = "Allow backend traffic from public subnet"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = [var.public_subnet_cidr]
  }

  # Allow SSH from public subnet (for management via bastion/jump)
  ingress {
    description = "Allow SSH from public subnet"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.public_subnet_cidr]
  }

  # Allow all outbound (needed for Docker image pulls, etc.)
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.env}-private-sg"
    Environment = var.env
  }
}
