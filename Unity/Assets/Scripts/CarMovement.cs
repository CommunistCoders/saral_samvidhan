using UnityEngine;
// Attached to car
public class CarMovement : MonoBehaviour
{
    public float moveSpeed = 200f;
    public float rotationSpeed = 100f;
    private bool canDrive = false;
    public GameObject player;

    public GameObject arrow;

    public KnowledgeUI kui;

    public float buildingCollisions = 0;
    private Rigidbody rb;
    public Camera carCamera;
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        if (carCamera != null)
        {
            carCamera.gameObject.SetActive(false); // Initially disable car camera
        }
        if (arrow != null)
        {
            arrow.gameObject.SetActive(false);
        }
    }

    void FixedUpdate()
    {
        if (canDrive)
        {
            DriveCar();
        }
        if (Input.GetKey(KeyCode.F) && !player.activeSelf)
        {
            player.SetActive(true);
            player.transform.position = transform.position + new Vector3(10, 0, 100); // Adjust offset as needed
            player.transform.rotation = Quaternion.Euler(90, 180, 0);
            canDrive = false;
        }
    }

    public void EnableControls()
    {
        canDrive = true;
        if (carCamera != null)
        {
            carCamera.gameObject.SetActive(true); // Activate car camera
            arrow.gameObject.SetActive(true);
        }
    }

    void DriveCar()
    {
        float moveInput = 0;

        rb.angularVelocity = Vector3.zero; // fix for collisions
        rb.linearVelocity = Vector3.zero;

        if (Input.GetKey(KeyCode.W))
        {
            moveInput = 1; // Move forward
        }
        else if (Input.GetKey(KeyCode.S))
        {
            moveInput = -1; // Move backward
        }

        if (moveInput != 0)
        {
            Vector3 moveDirection = transform.forward * moveInput * moveSpeed * Time.deltaTime;
            rb.MovePosition(rb.position + moveDirection); // Use Rigidbody to move the car
        }

        float rotationInput = 0;
        if (Input.GetKey(KeyCode.A))
        {
            rotationInput = -1; // Rotate left
        }
        else if (Input.GetKey(KeyCode.D))
        {
            rotationInput = 1; // Rotate right
        }

        if (rotationInput != 0)
        {
            float rotation = rotationInput * rotationSpeed * Time.deltaTime;
            rb.MoveRotation(rb.rotation * Quaternion.Euler(0, rotation, 0)); // Use Rigidbody for rotation
        }
    }
    void OnCollisionEnter(Collision collision)
    {
        // Prevent movement when colliding with any object
        if (!collision.gameObject.CompareTag("Player"))
        {
            canDrive = false;
            if (collision.gameObject.CompareTag("BuildingColliders"))
            {
                kui.setCollisionData();
                kui.enableBad();
                buildingCollisions += 1;
            }
        }
    }

    void OnCollisionExit(Collision collision)
    {
        canDrive = true;
    }
    public void Move(int dir)
    {
        if (canDrive)
        {
            Vector3 moveDirection = transform.forward * dir * moveSpeed * Time.deltaTime;
            rb.MovePosition(rb.position + moveDirection); // Use Rigidbody to move the car
        }
    }
    public void Rotate(int dir)
    {
        if (canDrive)
        {
            float rotation = dir * rotationSpeed * Time.deltaTime;
            rb.MoveRotation(rb.rotation * Quaternion.Euler(0, rotation, 0)); // Use Rigidbody for rotation
        }
    }
}
