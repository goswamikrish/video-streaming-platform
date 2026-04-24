
# ─── PUBLIC INSTANCE (Frontend + API Proxy) ──────────────────────────────────

resource "aws_instance" "public" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.public_subnet_id
  vpc_security_group_ids      = [var.public_sg_id]
  key_name                    = var.key_name
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    set -ex

    # Update system and install Docker
    apt-get update -y
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu

    # Pull and run frontend container (port 3000 -> 8080 inside container)
    docker run -d \
      --name frontend \
      --restart unless-stopped \
      -p 3000:8080 \
      -e BACKEND_URL=http://${aws_instance.private.private_ip}:5000 \
      -e API_PROXY_URL=http://172.17.0.1:4000 \
      krishsoh/youtube-frontend:latest

    # Pull and run API proxy container (port 4000)
    docker run -d \
      --name api-proxy \
      --restart unless-stopped \
      -e RAPIDAPI_KEY=70d5924dc9msh2ed264d34fc1f67p192788jsn3356317d075b \
      -e RAPIDAPI_HOST=youtube-v31.p.rapidapi.com \
      -p 4000:4000 \
      krishsoh/youtube-api-proxy:latest
  EOF

  tags = {
    Name        = "${var.env}-public-instance"
    Environment = var.env
  }
}

# ─── PRIVATE INSTANCE (Backend) ──────────────────────────────────────────────

resource "aws_instance" "private" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.public_subnet_id
  vpc_security_group_ids      = [var.private_sg_id]
  key_name                    = var.key_name
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    set -ex

    # Update system and install Docker
    apt-get update -y
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu

    # Pull and run backend container (port 5000)
    docker run -d \
      --name backend \
      --restart unless-stopped \
      -e MONGO_URI=mongodb+srv://youtube:Krishgoswami271004@cluster0.h2oul08.mongodb.net/?appName=Cluster0 \
      -e JWT_SECRET=shhh \
      -p 5000:5000 \
      krishsoh/youtube-backend:latest
  EOF

  tags = {
    Name        = "${var.env}-private-instance"
    Environment = var.env
  }
}
