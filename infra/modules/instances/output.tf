output "public_instance_id" {
  value       = aws_instance.public.id
  description = "ID of the public EC2 instance"
}

output "public_instance_public_ip" {
  value       = aws_instance.public.public_ip
  description = "Public IP of the frontend instance"
}

output "private_instance_id" {
  value       = aws_instance.private.id
  description = "ID of the private EC2 instance"
}

output "private_instance_private_ip" {
  value       = aws_instance.private.private_ip
  description = "Private IP of the backend instance"
}
