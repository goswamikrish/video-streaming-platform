# ─── VPC ────────────────────────────────────────────────────────────────────

resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "${var.env}-vpc"
    Environment = var.env
  }
}

# ─── SUBNETS ─────────────────────────────────────────────────────────────────

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = var.availability_zone1
  map_public_ip_on_launch = true          # instances get a public IP automatically

  tags = {
    Name        = "${var.env}-public-subnet"
    Environment = var.env
  }
}

resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.private_subnet_cidr
  availability_zone       = var.availability_zone1
  map_public_ip_on_launch = false         # no public IP for private subnet

  tags = {
    Name        = "${var.env}-private-subnet"
    Environment = var.env
  }
}

# ─── INTERNET GATEWAY ────────────────────────────────────────────────────────

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id               # attach IGW to the VPC

  tags = {
    Name        = "${var.env}-igw"
    Environment = var.env
  }
}

# ─── PUBLIC ROUTE TABLE ──────────────────────────────────────────────────────

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id

  route {
    cidr_block = "0.0.0.0/0"            # all outbound traffic
    gateway_id = aws_internet_gateway.this.id  # goes through IGW
  }

  tags = {
    Name        = "${var.env}-public-rt"
    Environment = var.env
  }
}

# Associate the public route table with the public subnet
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}