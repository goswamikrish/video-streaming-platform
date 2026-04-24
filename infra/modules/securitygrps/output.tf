output "public_sg_id" {
  value       = aws_security_group.public.id
  description = "ID of the public (web) security group"
}

output "private_sg_id" {
  value       = aws_security_group.private.id
  description = "ID of the private (backend) security group"
}
